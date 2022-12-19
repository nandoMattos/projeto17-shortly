import connection from "../../database/db.js";

export default async function urlBelongsToUserValidationMiddleware(
  req,
  res,
  next
) {
  const userId = res.locals.userId;

  try {
    const URL = await connection.query(
      `
      SELECT "userId"
      FROM shorten_urls
      WHERE id = $1;
    `,
      [req.params.id]
    );

    if (userId != URL.rows[0].userId) {
      res.sendStatus(401);
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
