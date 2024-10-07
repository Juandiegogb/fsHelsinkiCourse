import express from "express";
import { userController } from "../controller/userControllers.js";
export const userRouter = express.Router();

userRouter.get("/", userController.obtain);
userRouter.post("/", userController.create);
userRouter.post("/login", userController.login);
