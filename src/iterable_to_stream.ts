export const iterableToStream = <T>(
  iterable: AsyncIterable<T> | Iterable<T>
): ReadableStream<T> => {
  return new ReadableStream<T>({
    async pull(controller) {
      for await (const value of iterable) {
        controller.enqueue(value);
      }
      controller.close();
    },
  });
};
