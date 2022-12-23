import dayjs from "dayjs";
import { nanoid } from "nanoid/async";
import connection from "../database/db.js";
import urlRepository from "../repositories/urlRepository.js";

export async function shortenUrl(req, res) {
  const orignalUrl = req.body.url;
  req.body.url = await nanoid();

  try {
    await urlRepository.shortenUrl(
      res.locals.userId,
      orignalUrl,
      req.body.url,
      dayjs()
    );

    res.status(201).send({ shortUrl: req.body.url });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export function getUrl(req, res) {
  const { id, shortenUrl: shortUrl, originalUrl: url } = res.locals.urlInfo;

  res.status(200).send({ id, shortUrl, url });
}

export async function deleteUrl(req, res) {
  try {
    await urlRepository.deleteUrl(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function redirectToUrl(req, res) {
  try {
    await urlRepository.incrementVisitCount(res.locals.urlId);
    res.redirect(200, res.locals.originalUrl);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
