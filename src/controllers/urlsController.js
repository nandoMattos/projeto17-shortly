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

export async function getUrl(req, res) {
  const requestedUrl = res.locals.shortenUrl;

  res.status(200).send(requestedUrl);
}

export async function deleteUrl(req, res) {
  try {
    await connection.query(
      `
      DELETE FROM shorten_urls
      WHERE id = $1;
    `,
      [req.params.id]
    );

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
