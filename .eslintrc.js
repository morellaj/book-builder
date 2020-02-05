module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: "babel-eslint",
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': "off",
    "import/named" : "off",
    "strict":0,
    "react/prop-types":"off",
    "max-len":"off",
    "radix":"off"
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['Colors', './src/data/colors.json'],
          ['Data', './src/data/'],
          ['Common', './src/components/common/'],
          ['Icon', './src/components/common/Icon.jsx'],
          ['Constants', './src/data/constants.js'],
          ['Assets', './assets/'],
          ['Error', './src/components/common/Error.jsx'],
        ]
      }
    }
  },
};