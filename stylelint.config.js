module.exports = {
  root: true,
  // 优先使用extends 而不是plugins
  customSyntax: "postcss-scss",
  extends: [
    "stylelint-config-recommended-vue",
    "stylelint-config-standard-scss",
    "stylelint-config-prettier",
  ],
  plugins: ["stylelint-order", "stylelint-declaration-block-no-ignored-properties"],
  rules: {
    "plugin/declaration-block-no-ignored-properties": true,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
  },
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts"],
};
