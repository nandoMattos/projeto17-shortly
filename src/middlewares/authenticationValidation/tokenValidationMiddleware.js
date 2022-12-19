import jwt, { decode } from "jsonwebtoken";

export default function tokenValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_JWT, async (error, decode) => {
    if (error) {
      res.status(401).send("Token inválido.");
      return;
    }

    res.locals.userId = decode.id;
    next();
  });
}
