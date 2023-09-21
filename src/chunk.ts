export const chunk = function* <T>(
  iterable: Iterable<T>,
  size: number
): Generator<T[], void, void> {
  size = Math.floor(size);
  if (size < 1) throw new Error("Size must be a positive integer");
  let chunk: T[] = [];
  for (const item of iterable) {
    if (chunk.length < size) chunk.push(item);
    else {
      yield chunk;
      chunk = [item];
    }
  }
  if (chunk.length > 0) yield chunk;
};
