import { signInSchema } from "../../models/schemas.js";

export default function signInSchemaValidationMiddleware(req, res, next) {
  const { error } = signInSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(422).send(error.details.map((d) => d.message));
    return;
  }

  next();
}
