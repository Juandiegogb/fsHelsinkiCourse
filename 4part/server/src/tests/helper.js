import blog from "../models/blogModel.js";
export const dummy = (blogs) => 1;

export const totalLikes = (blogs) => {
  const reducer = (accum, sum) => accum + Number(sum.likes);
  return blogs.reduce(reducer, 0);
};

export const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const mostLiked = blogs.find((blog) => blog.likes === maxLikes);
  delete mostLiked._id;
  delete mostLiked.url;
  delete mostLiked.__v;
  return mostLiked;
};

export const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  console.log(blogs.map((blog) => blog.author));

  const count = authors.reduce((acc, element) => {
    console.log(acc);
    acc[element] = (acc[element] || 0) + 1; // Incrementa el contador
    return acc;
  }, []);
  console.log(count);
};

export const apiGetBlogs = async () => {
  const response = await blog.find();
  return response.map((e) => e.toJSON());
};

export const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];
