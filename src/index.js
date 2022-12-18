import express from "express";
import authorizationRouter from "./routers/authenticationRouter.js";
import urlRouter from "./routers/urlRouter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(authorizationRouter);
app.use(urlRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));
