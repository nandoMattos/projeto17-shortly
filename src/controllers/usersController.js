import connection from "../database/db.js";
import userRepository from "../repositories/userRepository.js";

export async function getUserInfo(req, res) {
  try {
    const sumVists = await userRepository.getSumOfUrls(res.locals.userId);
    const userUrls = await userRepository.getUserUrls(res.locals.userId);

    res.status(200).send({
      id: res.locals.userId,
      name: res.locals.userName,
      visitCount: Number(sumVists.rows[0].sum),
      shortenedUrls: userUrls.rows.map((url) => {
        return {
          id: url.id,
          shortUrl: url.shortenUrl,
          url: url.originalUrl,
          visitCount: req.visitCount,
        };
      }),
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
