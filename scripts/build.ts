import { build, emptyDir } from "dnt/mod.ts";

if (!Deno.args[0]) throw new Error("No package version given!");

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  compilerOptions: {
    lib: ["dom", "esnext"],
  },
  importMap: "./deno.jsonc",
  package: {
    name: "@krofdrakula/transformers",
    description:
      "A collection of reusable transforming functions for convenience",
    keywords: ["streams", "iterables"],
    version: Deno.args[0],
  },
});
