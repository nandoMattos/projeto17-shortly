import { Router } from "express";
import emailRegisteredValidationMiddleware from "../middlewares/authenticationValidation/emailRegisteredValidationMiddleware.js";
import signUpSchemaValidationMiddleware from "../middlewares/authenticationValidation/signUpSchemaValidationMiddleware.js";
import { insertUser } from "../controllers/authenticationController.js";

const router = Router();

router.post(
  "/signup",
  signUpSchemaValidationMiddleware,
  emailRegisteredValidationMiddleware,
  insertUser
);

export default router;
