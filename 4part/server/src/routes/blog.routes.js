import express from "express";
import { blogController } from "../controller/blogsController.js";

export const blogRouter = express.Router();

blogRouter.get("/blogs", blogController.obtain);
blogRouter.post("/blogs", blogController.create);
blogRouter.delete("/blogs/:id", blogController.remove);
blogRouter.put("/blogs/:id", blogController.updateLikes);
