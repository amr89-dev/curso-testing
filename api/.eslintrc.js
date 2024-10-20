module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: [2, "double"],
    "implicit-arrow-linebreak": [1],
    "comma-dangle": [1, "always-multiline"],
    "function-paren-newline": [1, "consistent"],
  },
};
