import connection from "../database/db.js";

function getShortenUrl(shortenUrl) {
  return connection.query(
    `
    SELECT id, "shortenUrl"
    FROM urls
    WHERE "originalUrl" = $1;
  `,
    [shortenUrl]
  );
}

function urlExists(url) {
  return connection.query(
    `
    SELECT id
    FROM urls
    WHERE "originalUrl" = $1;
  `,
    [url]
  );
}

function getUrls(urlId) {
  return connection.query(
    `
    SELECT id, "shortenUrl", "originalUrl"
    FROM urls
    WHERE id = $1
  `,
    [urlId]
  );
}

function getUserId(urlId) {
  return connection.query(
    `
    SELECT "userId"
    FROM urls
    WHERE id = $1;
  `,
    [urlId]
  );
}

function shortenUrl(userId, originalUrl, shortenUrl, createdAt) {
  return connection.query(
    `
    INSERT INTO urls
    ("userId", "originalUrl", "shortenUrl", "createdAt")
    VALUES
    ($1, $2, $3, $4);
  `,
    [userId, originalUrl, shortenUrl, createdAt]
  );
}

function deleteUrl(id) {
  return connection.query(
    `
    DELETE FROM urls
    WHERE id = $1;
  `,
    [id]
  );
}

function incrementVisitCount(urlId) {
  return connection.query(
    `
    UPDATE urls
    SET "visitCount" = "visitCount" + 1
    WHERE id = $1;
  `,
    [urlId]
  );
}

const urlRepository = {
  getShortenUrl,
  urlExists,
  getUrls,
  getUserId,
  shortenUrl,
  deleteUrl,
  incrementVisitCount,
};

export default urlRepository;
