import connection from "../../database/db.js";

export default async function shortUrlExistsValidationMiddleware(
  req,
  res,
  next
) {
  try {
    const shorUrlExists = await connection.query(
      `
      SELECT id, "originalUrl"
      FROM urls
      WHERE "shortenUrl" = $1;
    `,
      [req.params.shortUrl]
    );

    if (!shorUrlExists.rows[0]) {
      res.status(404).send("URL não encontrada.");
      return;
    }

    res.locals.originalUrl = shorUrlExists.rows[0].originalUrl;
    res.locals.urlId = shorUrlExists.rows[0].id;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
