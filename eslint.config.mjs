import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Matches the source project's own convention for a deliberately
      // unused override parameter (e.g. detectQuestionType's unused
      // `context` in the generic default) - without this, copying core/
      // verbatim from that project trips no-unused-vars here even though
      // it's an intentional, already-reviewed pattern there.
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];

export default eslintConfig;
