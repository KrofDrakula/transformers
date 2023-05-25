import { assertEquals } from "std/testing/asserts.ts";
import { createReadlineStream } from "./readline.ts";

Deno.test("works with an empty input", async () => {
  const source = new ReadableStream<string>({
    pull(controller) {
      controller.enqueue("");
      controller.close();
    },
  });

  const transformed = source.pipeThrough(createReadlineStream());
  const reader = transformed.getReader();
  const lines: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    lines.push(value);
  }
  assertEquals(lines, [""]);
});
Deno.test("works with a single line spread across many chunks", async () => {
  const source = new ReadableStream<string>({
    pull(controller) {
      controller.enqueue("a ");
      controller.enqueue("good ");
      controller.enqueue("day ");
      controller.enqueue("to ");
      controller.enqueue("you ");
      controller.enqueue("sir.");
      controller.close();
    },
  });

  const transformed = source.pipeThrough(createReadlineStream());
  const reader = transformed.getReader();
  const lines: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    lines.push(value);
  }
  assertEquals(lines, ["a good day to you sir."]);
});
Deno.test("works with many lines in a single chunk", async () => {
  const source = new ReadableStream<string>({
    pull(controller) {
      controller.enqueue(`what's love got to do
got to do with it`);
      controller.close();
    },
  });

  const transformed = source.pipeThrough(createReadlineStream());
  const reader = transformed.getReader();
  const lines: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    lines.push(value);
  }
  assertEquals(lines, ["what's love got to do", "got to do with it"]);
});
Deno.test("works with a mix of lines and chunks", async () => {
  const source = new ReadableStream<string>({
    pull(controller) {
      controller.enqueue(`what's love got to do
got to do with it`);
      controller.close();
    },
  });

  const transformed = source.pipeThrough(createReadlineStream());
  const reader = transformed.getReader();
  const lines: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    lines.push(value);
  }
  assertEquals(lines, ["what's love got to do", "got to do with it"]);
});
Deno.test("works in char-by-char mode", async () => {
  const source = new ReadableStream<string>(
    {
      pull(controller) {
        controller.enqueue("this should be first line\nand another line");
        controller.close();
      },
    },
    { highWaterMark: 1 }
  );

  const transformed = source.pipeThrough(createReadlineStream());
  const reader = transformed.getReader();
  const lines: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    lines.push(value);
  }
  assertEquals(lines, ["this should be first line", "and another line"]);
});
Deno.test("works with a custom separator", async () => {
  const source = new ReadableStream<string>({
    pull(controller) {
      controller.enqueue("const a = 3; console.log(a);");
      controller.close();
    },
  });
  const transformed = source.pipeThrough(createReadlineStream(/;\s*/));
  const reader = transformed.getReader();
  const lines: string[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    lines.push(value);
  }
  assertEquals(lines, ["const a = 3", "console.log(a)", ""]);
});
