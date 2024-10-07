import express from "express";
import { blogController } from "../controller/blogsController.js";

export const blogRouter = express.Router();

blogRouter.get("/", blogController.obtain);
blogRouter.post("/", blogController.create);
blogRouter.delete("/:id", blogController.remove);
blogRouter.put("/:id", blogController.updateLikes);
