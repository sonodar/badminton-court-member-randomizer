module.exports = {
  root: true,
  extends: ["@doubles-member-generator/eslint-config/base"],
  ignorePatterns: [
    "node_modules/",
    "coverage/",
    "**/*.js",
    "src/API.ts",
    "src/models/",
    "src/graphql/*.ts",
  ],
};
