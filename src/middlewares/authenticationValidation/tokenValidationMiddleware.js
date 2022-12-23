import jwt, { decode } from "jsonwebtoken";
import userRepository from "../../repositories/userRepository.js";

export default function tokenValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_JWT, async (error, decode) => {
    if (error) {
      res.status(401).send("Token inválido.");
      return;
    }
    const { id: userId, username, email } = decode;

    const userExists = await userRepository.userIdExists(userId);

    if (!userExists.rows[0]) {
      res.status(404).send("Usuário não encontrado.");
      return;
    }

    const { name: registeredUsername, email: registeredEmail } =
      userExists?.rows[0];

    // very specific case, where user is deleted and someone inserts manually his old id
    if (username !== registeredUsername || email !== registeredEmail) {
      res.status(404).send("Usuário não encontrado.");
      return;
    }

    res.locals.userId = userId;
    res.locals.userName = registeredUsername;
    next();
  });
}
