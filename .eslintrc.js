module.exports = {
  extends: ['eslint-config-codely/typescript'],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    {
      files: ["*.dto.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "no-use-before-define": "off",
      },
    },
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/restrict-template-expressions": "warn",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/restrict-template-expressions": "off",
  },
};
