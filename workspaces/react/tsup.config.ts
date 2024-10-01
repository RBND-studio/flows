import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  minify: true,
  dts: true,
  banner: {
    js: '"use client"',
  },
});