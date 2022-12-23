import urlRepository from "../../repositories/urlRepository.js";

export default async function urlBelongsToUserValidationMiddleware(
  req,
  res,
  next
) {
  const userId = res.locals.userId;

  try {
    const URL = await urlRepository.getUserId(req.params.id);

    if (userId != URL.rows[0].userId) {
      res.sendStatus(401);
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
