import urlRepository from "../../repositories/urlRepository.js";

export default async function shortUrlExistsValidationMiddleware(
  req,
  res,
  next
) {
  try {
    const shortenUrlExists = await urlRepository.getOriginalUrl(
      req.params.shortUrl
    );

    if (!shortenUrlExists.rows[0]) {
      res.status(404).send("URL não encontrada.");
      return;
    }

    res.locals.originalUrl = shortenUrlExists.rows[0].originalUrl;
    res.locals.urlId = shortenUrlExists.rows[0].id;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
