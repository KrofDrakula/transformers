export const createReadlineStream = (separator: string | RegExp = /\r?\n/) => {
  let remainder = "";
  return new TransformStream<string, string>({
    transform(chunk, controller) {
      const lines = chunk.split(separator);
      if (lines.length > 1) {
        const [first, ...rest] = lines;
        controller.enqueue(remainder + first);
        for (let i = 0; i < rest.length - 1; i++)
          controller.enqueue(rest.at(i)!);
        remainder = rest.at(-1)!;
      } else {
        remainder += lines.at(0) ?? "";
      }
    },
    flush(controller) {
      controller.enqueue(remainder);
      remainder = "";
    },
  });
};
