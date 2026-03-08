import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import globals from "globals";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

export default [
  {
    ignores: [
      "**/*{.,-}min.js",
      "**/*.sh",
      "**/*.py",
      "jqClock.min.js",
      "coverage/**",
      "static/dist/**",
      "static/docs/**",
    ],
  },
  ...compat.config({
    extends: ["airbnb", "airbnb/hooks", "prettier"],
    parser: "@babel/eslint-parser",
    parserOptions: {
      babelOptions: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        plugins: ["@babel/plugin-transform-runtime"],
      },
    },
    plugins: ["html", "react"],
    rules: {
      "no-param-reassign": 1,
      "react/prop-types": 0,
      "react/jsx-props-no-spreading": 0,
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      "react/function-component-definition": [
        0,
        {
          namedComponents: "function-declaration",
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        parser: "@typescript-eslint/parser",
        plugins: ["@typescript-eslint"],
        parserOptions: {
          project: "./tsconfig.json",
        },
        extends: ["prettier"],
        rules: {
          "react/require-default-props": 0,
          "@typescript-eslint/no-explicit-any": 1,
          // Allow JSX in .tsx files
          "react/jsx-filename-extension": [
            "error",
            { extensions: [".jsx", ".tsx"] },
          ],
          // TypeScript handles these natively
          "no-undef": "off",
          "no-unused-vars": "off",
          "@typescript-eslint/no-unused-vars": [
            "error",
            {
              vars: "all",
              args: "after-used",
              argsIgnorePattern: "^_",
              caughtErrorsIgnorePattern: "^_",
              ignoreRestSiblings: true,
            },
          ],
          "no-shadow": "off",
          "@typescript-eslint/no-shadow": "error",
          "no-use-before-define": "off",
          "@typescript-eslint/no-use-before-define": "error",
          "no-redeclare": "off",
          "@typescript-eslint/no-redeclare": "error",
        },
      },
    ],
  }),
  // Environment globals for specific files
  {
    files: ["jest-globals-setup.js", "jest-setup.js", "jest.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        globalThis: "readonly",
      },
    },
  },
];
