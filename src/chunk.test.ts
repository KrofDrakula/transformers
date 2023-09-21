import { chunk } from "./chunk.ts";
import { assertEquals, assertThrows } from "std/testing/asserts.ts";

Deno.test("throws error when size is invalid", () => {
  assertThrows(() => [...chunk([], -1)]);
});

Deno.test("should not iterate over an empty iterable", () => {
  assertEquals([...chunk([], 1)], []);
});

Deno.test("groups items in chunk of specified size or less", () => {
  assertEquals([...chunk([1, 2, 3, 4, 5], 2)], [[1, 2], [3, 4], [5]]);
});
