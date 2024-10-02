import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import asyncErrors from "express-async-errors";
import { blogRouter } from "./src/routes/blog.routes.js";
import { logger } from "./src/utils/logger.js";
import { variables } from "./src/utils/config.js";
import blogModel from "./src/models/blogModel.js";
import { errorHandler } from "./src/utils/middlewares.js";

export const app = express();

const uri = variables.MONGODB_URI;
console.log(uri);
mongoose
  .connect(uri, { dbName: "blog-App" })
  .then(() => logger.info("DB is ready"));

app.use(cors());
app.use(express.json());
app.use("/api", blogRouter);
logger.info("pendiente 4.7");
app.use(errorHandler);

// const blogs = [
//   {
//     title: "React patterns",
//     author: "Michael Chan",
//     url: "https://reactpatterns.com/",
//     likes: 7,
//   },
//   {
//     title: "Go To Statement Considered Harmful",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
//     likes: 5,
//   },
//   {
//     title: "Canonical string reduction",
//     author: "Edsger W. Dijkstra",
//     url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
//     likes: 12,
//   },
//   {
//     title: "First class tests",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
//     likes: 10,
//   },
//   {
//     title: "TDD harms architecture",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
//     likes: 0,
//   },
//   {
//     title: "Type wars",
//     author: "Robert C. Martin",
//     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
//     likes: 2,
//   },
// ];

// const test = () => {
//   blogs.map(async (blog) => {
//     await blogModel.create(blog);
//     console.log("done");
//   });
// };

// test();
