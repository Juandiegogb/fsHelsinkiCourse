import { test, describe } from "node:test";
import { strictEqual } from "node:assert";
import { dummy } from './helper.js';


describe("Posts tests", () => {
  test("The dummy fn", () => {
    strictEqual(dummy([]), 1);
  });
});
