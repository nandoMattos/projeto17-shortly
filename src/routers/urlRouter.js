import { Router } from "express";
import { shortenUrl } from "../controllers/urlsController.js";
import tokenValidationMiddleware from "../middlewares/authenticationValidation/tokenValidationMiddleware.js";
import urlSchemaValidationMiddleware from "../middlewares/urlsValidation/urlSchemaValidationMiddleware.js";

const router = Router();

router.post(
  "/urls/shorten",
  tokenValidationMiddleware,
  urlSchemaValidationMiddleware,
  shortenUrl
);

export default router;
