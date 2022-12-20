import express from "express";
import authorizationRouter from "./routers/authenticationRouter.js";
import urlRouter from "./routers/urlRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import rankingRouter from "./routers/rankingRouter.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(authorizationRouter);
app.use(urlRouter);
app.use(userRouter);
app.use(rankingRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));
