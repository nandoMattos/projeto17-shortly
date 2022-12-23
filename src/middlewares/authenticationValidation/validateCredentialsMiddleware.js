import bcrypt from "bcrypt";
import userRepository from "../../repositories/userRepository.js";

export default async function validateCredentialsMiddleware(req, res, next) {
  const { password } = req.body;
  try {
    const { rows } = await userRepository.getUserInfo(req.body.email);

    const userPassword = rows[0]?.password;

    if (!userPassword || !bcrypt.compareSync(password, userPassword)) {
      res.status(401).send("Email ou senha inválidos");
      return;
    }

    res.locals.userInfo = rows[0];
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
