import connection from "../../database/db.js";
import urlRepository from "../../repositories/urlRepository.js";

export default async function urlAlreadyShortenValidationMiddleware(
  req,
  res,
  next
) {
  const urlAlreadyExists = await urlRepository.getShortenUrl(req.body.url);

  if (urlAlreadyExists.rows[0]) {
    res.status(409).send("URL já cadastrada.");
    return;
  }

  next();
}
