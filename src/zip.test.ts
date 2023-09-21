import { zip } from "./zip.ts";
import { assertEquals } from "std/testing/asserts.ts";

Deno.test("works with sync iterables", () => {
  const zipped = [...zip(["a", "b", "c"], ["1", "2"])];
  assertEquals(zipped, [
    ["a", "1"],
    ["b", "2"],
  ]);
});

Deno.test("works with async iterable values", async () => {
  const delayed = <T>(iterable: Iterable<T>) =>
    Array.from(iterable).map((value) => Promise.resolve(value));
  const zipped = [...zip(delayed(["a", "b", "c"]), delayed(["1", "2"]))];
  const result = await Promise.all(zipped.map((values) => Promise.all(values)));
  assertEquals(result, [
    ["a", "1"],
    ["b", "2"],
  ]);
});
