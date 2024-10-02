import { describe, test, after, beforeEach } from "node:test";
import { strictEqual, deepEqual, deepStrictEqual, equal } from "node:assert";
import supertest from "supertest";
import { app } from "../../app.js";
import blog from "../models/blogModel.js";
import { apiGetBlogs, blogs } from "./helper.js";
import mongoose from "mongoose";

const api = supertest(app);

beforeEach(async () => {
  await blog.deleteMany();
  const createPromises = blogs.map((e) => blog.create(e));
  await Promise.all(createPromises);
});

describe("Blogs", () => {
  test("Get the blogs list", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    strictEqual(response.body.length, blogs.length);
  });

  test("Id prop validator", async () => {
    const blogsInDB = await apiGetBlogs();
    blogsInDB.map((e) => {
      equal(true, "id" in e);
    });
  });

  test("Post a new blog on DB", async () => {
    const blogsInDB = await apiGetBlogs();
    await api
      .post("/api/blogs")
      .send(blogs[0])
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const blogsInDB2 = await apiGetBlogs();

    strictEqual(blogsInDB2.length, blogsInDB.length + 1);
  });

  test("Create a blog without prop likes ", async () => {
    const newBlog = blogs[0];
    delete newBlog.likes;
    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    strictEqual(response.body.data.likes, 0);
  });

  test("400 status code for post a blog without url or title ", async () => {
    const newBlog = { author: "Juan Diego" };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("204 status code when delete a blog", async () => {
    const blogsInDB = await apiGetBlogs();
    const id = blogsInDB[0].id;
    await api
      .delete(`/api/blogs/${id}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("204 status code when update a blog (likes)", async () => {
    const blogsInDB = await apiGetBlogs();
    const id = blogsInDB[0].id;
    await api
      .put(`/api/blogs/${id}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("400 status code when update a unexist blog", async () => {
    const blogsInDB = await apiGetBlogs();
    const id = blogsInDB[0].id;
    await api.delete(`/api/blogs/${id}`);
    await api
      .put(`/api/blogs/${id}`)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

after(() => {
  mongoose.connection.close();
});
