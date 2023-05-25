export async function* streamToIterable<T>(
  stream: ReadableStream<T>
): AsyncGenerator<T> {
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) return;
    yield value;
  }
}
