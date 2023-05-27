type Deferred<T, E = unknown> = Promise<T> & {
  resolve: (value: T) => Promise<T>;
  reject: (error?: E) => Promise<T>;
};

export const deferred = <T, E = unknown>(): Deferred<T, E> => {
  let resolve: (value: T) => Promise<T>;
  let reject: (err?: unknown) => Promise<T>;
  const promise = new Promise<T>((yep, nope) => {
    resolve = (v) => {
      yep(v);
      return promise;
    };
    reject = (err) => {
      nope(err);
      return promise;
    };
  }) as Deferred<T, E>;
  promise.resolve = resolve!;
  promise.reject = reject!;
  return promise;
};
