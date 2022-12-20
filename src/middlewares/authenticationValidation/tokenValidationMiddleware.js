import jwt, { decode } from "jsonwebtoken";
import connection from "../../database/db.js";

export default function tokenValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_JWT, async (error, decode) => {
    if (error) {
      res.status(401).send("Token inválido.");
      return;
    }
    const { id: userId, username, email } = decode;

    const userExists = await connection.query(
      `
      SELECT name, email
      FROM users
      WHERE id = $1;
    `,
      [userId]
    );

    if (!userExists.rows[0]) {
      res.status(401).send("Token inválido.");
      return;
    }

    // very specific case, where user is deleted and someone inserts manually his old id
    const { name: registeredUsername, email: registeredEmail } =
      userExists?.rows[0];

    if (username !== registeredUsername || email !== registeredEmail) {
      res.status(401).send("Token inválido.");
      return;
    }

    res.locals.userId = userId;
    next();
  });
}
