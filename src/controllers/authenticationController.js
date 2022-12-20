import connection from "../database/db.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

export async function insertUser(req, res) {
  const { name, email, password } = req.body;

  await connection.query(
    `
    INSERT INTO users
    (name, email, password, "createdAt")
    VALUES
    ($1, $2, $3, $4);
  `,
    [name, email, bcrypt.hashSync(password, 10), dayjs()]
  );

  res.sendStatus(201);
}

export function sendJwt(req, res) {
  const { id, name, email } = res.locals.userInfo;

  res.status(200).send(
    jwt.sign({ id, username: name, email }, process.env.SECRET_JWT, {
      expiresIn: 3600,
    })
  );
}
