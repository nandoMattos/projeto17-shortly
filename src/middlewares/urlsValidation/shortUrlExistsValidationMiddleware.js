import connection from "../../database/db.js";

export default async function shortUrlExistsValidationMiddleware(
  req,
  res,
  next
) {
  try {
    const shorUrlExists = connection.query(
      `
      SELECT original_url
      FROM shorten_urls
      WHERE shorten_url;
    `,
      [req.params]
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
