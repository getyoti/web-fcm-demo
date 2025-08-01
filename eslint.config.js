import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        process: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react": react,
      "jsx-a11y": jsxA11y,
      "import": importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // Airbnb-style React rules
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-filename-extension": ["warn", { extensions: [".jsx"] }],
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "react/jsx-closing-bracket-location": ["error", "line-aligned"],
      "react/jsx-closing-tag-location": "error",
      "react/jsx-curly-spacing": ["error", "never"],
      "react/jsx-equals-spacing": ["error", "never"],
      "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
      "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      "react/jsx-no-duplicate-props": ["error", { ignoreCase: true }],
      "react/jsx-no-undef": "error",
      "react/jsx-pascal-case": ["error", { allowAllCaps: true }],
      "react/jsx-props-no-multi-spaces": "error",
      "react/jsx-sort-props": "off", // Make prop sorting optional for demo
      "react/jsx-tag-spacing": ["error", {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never",
      }],
      "react/jsx-wrap-multilines": ["error", {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line",
      }],
      "react/no-array-index-key": "warn",
      "react/no-danger": "warn",
      "react/no-did-mount-set-state": "error",
      "react/no-did-update-set-state": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-multi-comp": ["error", { ignoreStateless: true }],
      "react/no-string-refs": "error",
      "react/no-unknown-property": "error",
      "react/prefer-es6-class": ["error", "always"],
      "react/prefer-stateless-function": ["error", { ignorePureComponents: true }],
      "react/prop-types": "off", // Disable prop-types for this project
      "jsx-a11y/label-has-associated-control": "off", // Relax accessibility rules for demo
      "react/require-render-return": "error",
      "react/self-closing-comp": "error",
      "react/sort-comp": ["error", {
        order: [
          "static-methods",
          "lifecycle",
          "everything-else",
          "render",
        ],
      }],
      "react/style-prop-object": "error",

      // General Airbnb-style rules
      "indent": ["error", 2, { SwitchCase: 1 }],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "prefer-const": "error",
      "no-var": "error",
      "arrow-spacing": "error",
      "space-before-blocks": "error",
      "keyword-spacing": "error",
      "space-infix-ops": "error",
      "eol-last": "error",
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],

      // Import rules (relaxed for development)
      "import/order": ["error", {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "never",
      }],
      "import/no-unresolved": "off", // Disable for Vite path resolution
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "off", // Disable for class fields syntax
      "import/no-absolute-path": "error",

      // Overrides for existing code
      "no-unused-vars": ["error"],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
