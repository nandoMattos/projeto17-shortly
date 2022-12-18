import connection from "../database/db.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

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
