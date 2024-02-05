const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "prettier",
  ],
  parserOptions: { project },
  plugins: ["@typescript-eslint", "import", "unused-imports", "react"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: { project },
    },
    react: { version: "detect" },
  },
  ignorePatterns: [
    "node_modules/",
    "coverage/",
    ".eslintrc.js",
    "**/*.js",
    "src/api/API.ts",
    "src/api/models/",
    "src/api/graphql/*.ts",
  ],
  rules: {
    "import/no-named-as-default": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
      },
    ],
    "import/order": "error",
    "unused-imports/no-unused-imports": "error",
  },
};
