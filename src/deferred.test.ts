import { assertEquals, assertInstanceOf, fail } from "std/testing/asserts.ts";
import { deferred } from "./deferred.ts";

Deno.test("deferred resolves correctly", async () => {
  const def = deferred<null>();
  await def.resolve(null).then((v) => assertEquals(v, null));
});

Deno.test("deferred rejects correctly", async () => {
  const def = deferred<null>();
  await def
    .reject(new Error("hehe"))
    .then(() => fail())
    .catch((err) => assertInstanceOf(err, Error));
});
