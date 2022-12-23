import connection from "../database/db.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

async function insertUser(name, email, password) {
  return connection.query(
    `
    INSERT INTO users
    (name, email, password, "createdAt")
    VALUES
    ($1, $2, $3, $4);
  `,
    [name, email, bcrypt.hashSync(password, 10), dayjs()]
  );
}

const authenticationRepository = {
  insertUser,
};

export default authenticationRepository;
