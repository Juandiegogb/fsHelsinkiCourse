import { after, describe, test } from "node:test";
import supertest from "supertest";
import { app } from "../../app.js";
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import { users } from './helper.js';


const api = supertest(app);

describe("Users", () => {
  test("Create users from the api", async () => {
    userModel.deleteMany();
    const request = api.post("/api/users/", users[0]).expect(201);
    console.log(request);
    await request;
  });
});

after(() => {
  mongoose.connection.close();
});
