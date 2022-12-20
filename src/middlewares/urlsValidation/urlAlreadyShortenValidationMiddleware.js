import connection from "../../database/db.js";

export default async function urlAlreadyShortenValidationMiddleware(
  req,
  res,
  next
) {
  const urlExists = await connection.query(
    `
    SELECT id
    FROM urls
    WHERE "originalUrl" = $1;
  `,
    [req.body.url]
  );

  if (urlExists.rows[0]) {
    res.status(409).send("URL já cadastrada.");
    return;
  }

  next();
}
