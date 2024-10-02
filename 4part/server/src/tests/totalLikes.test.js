import { describe, test } from "node:test";
import { strictEqual } from "node:assert";
import { blogs, totalLikes } from "./helper.js";

describe("Total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    strictEqual(result, 5);
  });

  test("When list has more than one blog", () => {
    const result = totalLikes(blogs);
    strictEqual(result, 36);
  });
});
