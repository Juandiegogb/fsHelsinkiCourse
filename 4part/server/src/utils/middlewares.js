import jwt from "jsonwebtoken";

export const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  next(error);
};

export const validateToken = (req, res, next) => {
  if (
    req.url === "/api/users/login" ||
    (req.url === "/api/users/" && req.method === "POST")
  ) {
    console.log("its fine");
    next();
  } else {
    console.log("we got you bro");
    const authorization = req.get("authorization");
    const token =
      authorization && authorization.startsWith("Bearer ")
        ? authorization.replace("Bearer ", "")
        : null;
    const secret = process.env.SECRET;
    req.token = jwt.verify(token, secret);
    next();
  }
};
