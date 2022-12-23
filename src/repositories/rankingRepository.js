import connection from "../database/db.js";

async function getRanking() {
  return connection.query(`
    SELECT u.id, u.name, COUNT(ur.id) as "linksCount", COALESCE(SUM("visitCount"),0) as "visitCount"
    FROM users u
    LEFT JOIN urls ur ON ur."userId" = u.id
    GROUP BY u.id
    ORDER BY "visitCount" DESC, "linksCount" DESC
    LIMIT 10;
  `);
}

const rankingRepository = {
  getRanking,
};

export default rankingRepository;
