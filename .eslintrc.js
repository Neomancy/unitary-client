module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true,
    amd: true,
    jasmine: true
  },
  plugins: ["mocha", "eslint-plugin-requirejs", "jasmine"],
  extends: ["eslint:recommended", "plugin:jasmine/recommended"],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "always"]
  }
};
