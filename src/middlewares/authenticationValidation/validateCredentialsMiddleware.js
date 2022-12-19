import connection from "../../database/db.js";
import bcrypt from "bcrypt";

export default async function validateCredentialsMiddleware(req, res, next) {
  const { password } = req.body;
  try {
    const { rows } = await connection.query(
      `
      SELECT password, name, id
      FROM users
      WHERE email = $1;
    `,
      [req.body.email]
    );

    const userPassword = rows[0]?.password;

    if (!userPassword || !bcrypt.compareSync(password, userPassword)) {
      res.status(401).send("Email ou senha inválidos");
      return;
    }

    req.username = rows[0].name;
    req.id = rows[0].id;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
