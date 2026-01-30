import tanstackQuery from "@tanstack/eslint-plugin-query";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import drizzle from "eslint-plugin-drizzle";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    extends: [reactHooks.configs.flat.recommended],
    plugins: {
      drizzle,
      "@tanstack/query": tanstackQuery,
    },
    rules: {
      ...drizzle.configs.recommended.rules,
      ...tanstackQuery.configs.recommended.rules,
    },
  },
]);

export default eslintConfig;
