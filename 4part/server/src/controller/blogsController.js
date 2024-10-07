import blog from "../models/blogModel.js";
import userModel from "../models/userModel.js";

export const blogController = {};

blogController.obtain = async (req, res) => {
  const blogs = await blog.find().populate("user", "username");
  res.status(200).send(blogs);
};

blogController.create = async (req, res) => {
  const userToken = req.token;
  const { title, url, author } = req.body;
  if (!(title && url && author)) {
    return res
      .status(400)
      .json({ message: "Title, aurthor and url are required" });
  }
  const userToFind = await userModel.findById(userToken.id);
  const newBlog = await blog.create({ title, user: userToken.id, url, author });
  userToFind.blogs.push(newBlog);
  await userModel.findByIdAndUpdate(userToFind, userToFind);
  res.status(201).json({ message: "Blog created", data: newBlog.toJSON() });
};

blogController.remove = async (req, res) => {
  const id = req.params.id;
  const userToken = req.token;
  const blogToDelete = await blog.findById(id).populate("user");
  console.log(blogToDelete.toJSON().user);
  if (userToken.id === blogToDelete.toJSON().user.id) {
    await blog.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete success" });
  } else {
    return res
      .status(401)
      .json({ message: "Blog must deleted by the creator" });
  }
};

blogController.updateLikes = async (req, res) => {
  const id = req.params.id;
  const response = await blog.findByIdAndUpdate(id, { likes: req.body.likes });
  response
    ? res.status(201).json({ message: "Update success" })
    : res.status(400).json({ message: "Update failed, check id" });
};
