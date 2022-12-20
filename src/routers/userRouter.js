import { Router } from "express";
import { getUserInfo } from "../controllers/usersController.js";
import tokenValidationMiddleware from "../middlewares/authenticationValidation/tokenValidationMiddleware.js";

const router = Router();

router.get("/users/me", tokenValidationMiddleware, getUserInfo);

export default router;
