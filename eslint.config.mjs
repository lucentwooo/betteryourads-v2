import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: dirname
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".artifacts/**",
      "vitest.config.cjs",
      "next-env.d.ts"
    ]
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"]
  })
];

export default eslintConfig;
