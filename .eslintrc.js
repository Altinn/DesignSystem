module.exports = {
  "extends": "airbnb-base/legacy",
  "parserOptions": {
    "ecmaVersion": 5
  },
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "indent": ["error", 2],
    "brace-style": ["error", "1tbs"],
    "curly": ["error", "all"],
    "func-call-spacing": ["error", "never"],
    "linebreak-style": "off",
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "func-names": ["error", "never"],
    "no-unused-vars": "off",
    "no-underscore-dangle": "off"
  },
  "globals": {
    "chai": true,
    "rewire": true,
    "describe": true,
    "expect": true,
    "assert": true,
    "it": true,
    "$": true
  }
};
