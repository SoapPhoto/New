module.exports = {
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
    // "react/jsx-filename-extension": [2, { "extensions": [".jsx", ".tsx"] }],
    "linebreak-style": [0],
    "react/jsx-props-no-spreading": [0],
    "import/extensions": [0],
    "react/prop-types": [0],
    "no-plusplus": [0],
    "import/no-named-as-default": [0],
    "import/prefer-default-export": [0],
    "react-hooks/exhaustive-deps": "error",
    "max-len": [0],
    "no-underscore-dangle": [0],
    "react/require-default-props": [0]
  },
};
