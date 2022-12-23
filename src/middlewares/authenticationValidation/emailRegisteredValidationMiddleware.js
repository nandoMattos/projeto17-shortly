import userRepository from "../../repositories/userRepository.js";

export default async function emailRegisteredValidationMiddleware(
  req,
  res,
  next
) {
  try {
    const isEmailInUse = await userRepository.emailAlreadyInUse(req.body.email);

    if (isEmailInUse.rows[0]) {
      res.status(409).send("Email já cadastrado.");
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
