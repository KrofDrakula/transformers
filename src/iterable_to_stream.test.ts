import { iterableToStream } from "./iterable_to_stream.ts";
import { assertEquals } from "std/testing/asserts.ts";

Deno.test("emits non-async iterable to stream", async () => {
  const stream = iterableToStream(["a", "b", "c"]);
  const reader = stream.getReader();
  const result: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result.push(value);
  }
  assertEquals(result, ["a", "b", "c"]);
});

Deno.test("emits async iterable to stream", async () => {
  async function* reemit<T>(iterable: Iterable<T>) {
    for (const item of iterable) yield Promise.resolve(item);
  }
  const stream = iterableToStream(reemit(["a", "b", "c"]));
  const reader = stream.getReader();
  const result: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result.push(value);
  }
  assertEquals(result, ["a", "b", "c"]);
});
