module.exports = {
  // extends: require.resolve('@umijs/max/eslint'),
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins: ['react'],
  // 自定义全局变量
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    Promise: true,
    publicPath: true,
    REACT_APP_ENV: true,
    CLIENT_ENV: true,
  },
  // 根据个人习惯自定义rule
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'func-names': 'off',
    'no-restricted-globals': 'off',
    'react/no-unknown-property': 'off',
    "prefer-promise-reject-errors": 'off',
    'no-unused-expressions': 'off',
    'no-return-assign': 'off',
    'no-underscore-dangle': 'off',
    "camelcase": 'off',
    "no-console": "error",
    "max-classes-per-file": 'off',
    'no-use-before-define': 'off',
    'no-plusplus': 'off',
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    'no-return-await': 'off',
    'react/no-array-index-key': 'off',
    'react-hooks/rules-of-hooks': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'consistent-return': 'off',
  },
};
