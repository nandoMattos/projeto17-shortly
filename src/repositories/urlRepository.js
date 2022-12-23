import connection from "../database/db.js";

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

const urlRepository = { shortenUrl, deleteUrl, incrementVisitCount };

export default urlRepository;
