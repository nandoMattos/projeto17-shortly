import { urlSchema } from "../../models/schemas.js";

export default function urlSchemaValidationMiddleware(req, res, next) {
  const { error } = urlSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(422).send(error.details.map((d) => d.message));
    return;
  }

  next();
}
