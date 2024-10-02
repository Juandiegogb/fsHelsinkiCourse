import { describe, test } from "node:test";
import { deepEqual } from "node:assert";
import { blogs, favoriteBlog } from "./helper.js";

describe("Favorite blog", () => {
  test("Search the most liked blog", () => {
    const result = favoriteBlog(blogs);
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    deepEqual(result, expected);
  });
});
