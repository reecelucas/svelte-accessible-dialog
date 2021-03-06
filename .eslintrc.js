module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["**/*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  rules: {
    "no-shadow": ["error", { builtinGlobals: false, hoist: "functions" }],
  },
};
