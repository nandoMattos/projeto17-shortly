import { Router } from "express";
import emailRegisteredValidationMiddleware from "../middlewares/authenticationValidation/emailRegisteredValidationMiddleware.js";
import signUpSchemaValidationMiddleware from "../middlewares/authenticationValidation/signUpSchemaValidationMiddleware.js";
import {
  insertUser,
  sendJwt,
} from "../controllers/authenticationController.js";
import signInSchemaValidationMiddleware from "../middlewares/authenticationValidation/signInSchemaValidationMiddleware.js";
import validateCredentialsMiddleware from "../middlewares/authenticationValidation/validateCredentialsMiddleware.js";

const router = Router();

router.post(
  "/signup",
  signUpSchemaValidationMiddleware,
  emailRegisteredValidationMiddleware,
  insertUser
);

router.post(
  "/signin",
  signInSchemaValidationMiddleware,
  validateCredentialsMiddleware,
  sendJwt
);

export default router;
