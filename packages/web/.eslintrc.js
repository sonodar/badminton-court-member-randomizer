module.exports = {
  root: true,
  extends: [
    "@doubles-member-generator/eslint-config/base",
    "plugin:react/recommended",
  ],
  plugins: ["react"],
  settings: {
    react: { version: "detect" },
  },
  ignorePatterns: [
    "node_modules/",
    "coverage/",
    "**/*.js",
    "src/api/index.ts",
    "src/graphql/*.ts",
  ],
};
