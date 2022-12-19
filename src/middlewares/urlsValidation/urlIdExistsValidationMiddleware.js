import connection from "../../database/db.js";

export default async function urlIdExistsValidationMiddleware(req, res, next) {
  try {
    const urlIdExists = await connection.query(
      `
      SELECT shorten_url
      FROM shorten_urls
      WHERE id = $1
    `,
      [req.params.id]
    );

    if (!urlIdExists.rows[0]) {
      res.status(404).send("URL não encontrada.");
      return;
    }

    res.locals.shortenUrl = urlIdExists.rows[0].shorten_url;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
