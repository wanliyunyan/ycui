const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  root: true,
  env: {
    browser: true, //  browser global variables.
    es2021: true, //  adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
    "vue/setup-compiler-macros": true,
  },
  globals: {
    production: true, // 全局变量，且这个变量可以被重写
  },
  parser: "vue-eslint-parser", // 整理解析vue
  parserOptions: {
    parser: "@typescript-eslint/parser", // 单独解析vue中的ts文件
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "./.eslintrc-auto-import.json",
    // "eslint:recommended", // eslint 自己的标准，但是引用了airbnb-base这里就可以注释了
    "airbnb-base", // 爱彼迎标准 https://www.npmjs.com/package/eslint-config-airbnb-base
    "plugin:@typescript-eslint/recommended", // 为了兼容 ts https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
    // 通用配置写在 eslint-plugin-vue 之前
    "plugin:vue/vue3-recommended", // vue3 推荐标准    https://eslint.vuejs.org/user-guide/#usage
    "plugin:prettier/recommended", // 最后 prettier 兜底 https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
  ],
  rules: {
    "import/no-unresolved": 0,
    "import/no-absolute-path": 0,
    "import/extensions": 0,
    "no-param-reassign": 0,
    "no-shadow": "off",
    "import/no-extraneous-dependencies": 0,
    "@typescript-eslint/no-shadow": ["error"],
  },
});
