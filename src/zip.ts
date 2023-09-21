export function zip<A>(iterable: Iterable<A>): Generator<[A], void, void>;
export function zip<A, B>(
  a: Iterable<A>,
  b: Iterable<B>
): Generator<[A, B], void, void>;
export function zip<A, B, C>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>
): Generator<[A, B, C], void, void>;
export function zip<A, B, C, D>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>
): Generator<[A, B, C, D], void, void>;
export function zip<A, B, C, D, E>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>
): Generator<[A, B, C, D, E], void, void>;
export function zip<A, B, C, D, E, F>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
  f: Iterable<F>
): Generator<[A, B, C, D, E, F], void, void>;
export function zip<A, B, C, D, E, F, G>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
  f: Iterable<F>,
  g: Iterable<G>
): Generator<[A, B, C, D, E, F, G], void, void>;
export function zip<A, B, C, D, E, F, G, H>(
  a: Iterable<A>,
  b: Iterable<B>,
  c: Iterable<C>,
  d: Iterable<D>,
  e: Iterable<E>,
  f: Iterable<F>,
  g: Iterable<G>,
  h: Iterable<H>
): Generator<[A, B, C, D, E, F, G, H], void, void>;

export function* zip<T>(
  ...iterables: Iterable<T>[]
): Generator<T[], void, void> {
  const iterators = iterables.map((it) => it[Symbol.iterator]());
  const pull = () => iterators.map((it) => it.next());
  while (true) {
    const result: T[] = [];
    for (const { done, value } of pull()) {
      if (done) return;
      result.push(value);
    }
    yield result;
  }
}
