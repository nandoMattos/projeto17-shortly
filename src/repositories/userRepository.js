import connection from "../database/db.js";

function emailAlreadyInUse(email) {
  return connection.query(
    `
    SELECT id
    FROM users
    WHERE email = $1;
  `,
    [email]
  );
}

function userIdExists(userId) {
  return connection.query(
    `
    SELECT name, email
    FROM users
    WHERE id = $1;
  `,
    [userId]
  );
}

function getUserInfo(email) {
  return connection.query(
    `
    SELECT password, name, id, email
    FROM users
    WHERE email = $1;
  `,
    [email]
  );
}

function getSumOfUrls(userId) {
  return connection.query(
    `
    SELECT SUM("visitCount")
    FROM urls
    WHERE "userId" = $1;
  `,
    [userId]
  );
}

function getUserUrls(userId) {
  return connection.query(
    `
      SELECT id, "originalUrl", "shortenUrl", "visitCount"
      FROM urls
      WHERE "userId" = $1;
      `,
    [userId]
  );
}

const userRepository = {
  emailAlreadyInUse,
  userIdExists,
  getUserInfo,
  getSumOfUrls,
  getUserUrls,
};

export default userRepository;
