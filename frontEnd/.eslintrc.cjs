/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      alias: [['@', './src']],
    },
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/airbnb',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/mouse-events-have-key-events': 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'all',
        endOfLine: 'lf',
        printWidth: 100,
        proseWrap: 'never',
        arrowParens: 'avoid',
        htmlWhitespaceSensitivity: 'ignore',
        // parser: 'babel-flow',
      },
    ],
    'no-var': 'error',
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 'warn',
    'no-loss-of-precision': 'warn',
    'no-undef': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/newline-after-import': 'warn',
  },
};
