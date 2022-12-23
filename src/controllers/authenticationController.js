import jwt from "jsonwebtoken";
import authenticationRepository from "../repositories/authenticationRepository.js";

export async function insertUser(req, res) {
  const { name, email, password } = req.body;

  try {
    await authenticationRepository.insertUser(name, email, password);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

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
