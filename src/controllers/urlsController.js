import dayjs from "dayjs";
import { nanoid } from "nanoid/async";
import connection from "../database/db.js";

export async function shortenUrl(req, res) {
  const orignalUrl = req.body.url;
  req.body.url = await nanoid();

  try {
    await connection.query(
      `
      INSERT INTO urls
      ("userId", "originalUrl", "shortenUrl", "createdAt")
      VALUES
      ($1, $2, $3, $4);
    `,
      [res.locals.userId, orignalUrl, req.body.url, dayjs()]
    );

    res.status(201).send({ shortUrl: req.body.url });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const { id, shortenUrl: shortUrl, originalUrl: url } = res.locals.urlInfo;

  res.status(200).send({ id, shortUrl, url });
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

export async function redirectToUrl(req, res) {
  await connection.query(
    `
    UPDATE urls
    SET "visitCount" = "visitCount" + 1
    WHERE id = $1;
  `,
    [res.locals.urlId]
  );
  res.redirect(200, res.locals.originalUrl);
}
