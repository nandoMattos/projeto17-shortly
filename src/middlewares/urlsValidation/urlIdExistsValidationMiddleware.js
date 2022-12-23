import urlRepository from "../../repositories/urlRepository.js";

export default async function urlIdExistsValidationMiddleware(req, res, next) {
  try {
    const urlIdExists = await urlRepository.getUrls(req.params.id);

    if (!urlIdExists.rows[0]) {
      res.status(404).send("URL não encontrada.");
      return;
    }

    res.locals.urlInfo = urlIdExists.rows[0];
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
