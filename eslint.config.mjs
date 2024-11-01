
/** @type {import('eslint').Linter.Config[]} */
export default [ {
    rules: {
      "quotes": ["error", "double"],
      "no-unused-vars": "error",
      "indent": ["error", 2],
      "semi": ["error", "always"],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
    }
  }
];

