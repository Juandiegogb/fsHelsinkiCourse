import blog from "../models/blogModel.js";

export const blogController = {};

blogController.obtain = async (req, res) => {
  const blogs = await blog.find();
  res.status(200).send(blogs);
};

blogController.create = async (req, res) => {
  const { title, url } = req.body;
  if (!(title && url)) {
    return res.status(400).json({ message: "Title and url are required" });
  }
  const newBlog = await blog.create(req.body);
  res.status(201).json({ message: "Blog created", data: newBlog.toJSON() });
};

blogController.remove = async (req, res) => {
  const id = req.params.id;
  const response = await blog.findByIdAndDelete(id);
  response
    ? res.status(201).json({ message: "Delete success" })
    : res.status(400).json({ message: "Delete failed, check id" });
};

blogController.updateLikes = async (req, res) => {
  const id = req.params.id;
  const response = await blog.findByIdAndUpdate(id, { likes: req.body.likes });
  response
    ? res.status(201).json({ message: "Update success" })
    : res.status(400).json({ message: "Update failed, check id" });
};
