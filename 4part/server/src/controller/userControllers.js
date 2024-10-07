import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userController = {};

userController.login = async (req, res) => {
  const secret = process.env.SECRET;
  const { username, password } = req.body;
  let user = await userModel.findOne({ username });
  const isMatch =
    user !== null ? bcrypt.compareSync(password, user.passwordHash) : null;
  if (isMatch) {
    user = user.toJSON();
    delete user.blogs;
    res.status(200).json({ token: jwt.sign(user, secret) });
  } else {
    res.status(401).json({ message: "Bad credentials" });
  }
};

userController.obtain = async (req, res) => {
  const users = await userModel.find().populate("blogs");
  res.status(200).json(users);
};

userController.create = async (req, res) => {
  const { username, name, password } = req.body;
  if (!(username && name && password)) {
    return res.status(401).json({ message: "Incomplete information" });
  } else {
    if (password.length < 3) {
      return res.status(400).json({ message: "Password too short" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const savedUser = await userModel.create({
      username,
      name,
      passwordHash: passwordHash,
    });
    res.status(201).json(savedUser);
  }
};
