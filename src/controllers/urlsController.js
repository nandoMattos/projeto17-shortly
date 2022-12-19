import dayjs from "dayjs";
import { nanoid } from "nanoid/async";
import connection from "../database/db.js";

export async function shortenUrl(req, res) {
  const orignalUrl = req.body.url;
  req.body.url = await nanoid();

  try {
    await connection.query(
      `
      INSERT INTO shorten_urls
      ("userId", original_url, shorten_url, created_at)
      VALUES
      ($1, $2, $3, $4);
    `,
      [res.locals.userId, orignalUrl, req.body.url, dayjs()]
    );

    res.status(201).send(req.body.url);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
