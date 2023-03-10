import { Router } from "express";
import {
  deleteUrl,
  getUrl,
  redirectToUrl,
  shortenUrl,
} from "../controllers/urlsController.js";
import tokenValidationMiddleware from "../middlewares/authenticationValidation/tokenValidationMiddleware.js";
import shortUrlExistsValidationMiddleware from "../middlewares/urlsValidation/shortUrlExistsValidationMiddleware.js";
import urlAlreadyShortenValidationMiddleware from "../middlewares/urlsValidation/urlAlreadyShortenValidationMiddleware.js";
import urlBelongsToUserValidationMiddleware from "../middlewares/urlsValidation/urlBelongsToUserValidationMiddleware.js";
import urlIdExistsValidationMiddleware from "../middlewares/urlsValidation/urlIdExistsValidationMiddleware.js";
import urlSchemaValidationMiddleware from "../middlewares/urlsValidation/urlSchemaValidationMiddleware.js";

const router = Router();

router.post(
  "/urls/shorten",
  tokenValidationMiddleware,
  urlSchemaValidationMiddleware,
  urlAlreadyShortenValidationMiddleware,
  shortenUrl
);

router.get("/urls/:id", urlIdExistsValidationMiddleware, getUrl);

router.get(
  "/urls/open/:shortUrl",
  shortUrlExistsValidationMiddleware,
  redirectToUrl
);

router.delete(
  "/urls/:id",
  tokenValidationMiddleware,
  urlIdExistsValidationMiddleware,
  urlBelongsToUserValidationMiddleware,
  deleteUrl
);

export default router;
