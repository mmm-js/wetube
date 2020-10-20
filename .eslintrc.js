module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "spaced-comment": ["error", "always"], // 주석사용시 규칙적용
    "no-console": "off", // console사용 금지
  },
  env : {// 환경설정
    browser : true
  }
};
