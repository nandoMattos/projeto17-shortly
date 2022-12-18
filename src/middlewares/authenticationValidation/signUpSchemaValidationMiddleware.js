import { signUpSchema } from "../../models/schemas.js";

export default function signUpSchemaValidationMiddleware(req, res, next) {
  const { error } = signUpSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(422).send(error.details.map((d) => d.message));
    return;
  }

  next();
}
