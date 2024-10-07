import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import asyncErrors from "express-async-errors";
import { blogRouter } from "./src/routes/blog.routes.js";
import { logger } from "./src/utils/logger.js";
import { variables } from "./src/utils/config.js";
import { errorHandler, validateToken } from "./src/utils/middlewares.js";
import { userRouter } from "./src/routes/user.routes.js";

export const app = express();

const uri = variables.MONGODB_URI;
mongoose
  .connect(uri, { dbName: "blogApp" })
  .then(() => logger.info("DB is ready"));

app.use(cors());
app.use(express.json());
app.use(validateToken);
app.use("/api/blogs", blogRouter);
app.use("/api/users/", userRouter);
logger.info("pendiente 4.7");
app.use(errorHandler);
