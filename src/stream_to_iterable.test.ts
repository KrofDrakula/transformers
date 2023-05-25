import { assertEquals } from "std/testing/asserts.ts";
import { streamToIterable } from "./stream_to_iterable.ts";

Deno.test("converts a stream to an iterable", async () => {
  const source = new ReadableStream<number>({
    pull(controller) {
      controller.enqueue(1);
      controller.enqueue(2);
      controller.enqueue(3);
      controller.enqueue(4);
      controller.close();
    },
  });
  const items: number[] = [];
  for await (const n of streamToIterable(source)) items.push(n);
  assertEquals(items, [1, 2, 3, 4]);
});
