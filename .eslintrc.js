module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  plugins: ['react'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    Promise: true,
    publicPath: true,
    REACT_APP_ENV: true,
    CLIENT_ENV: true,
  },
  rules: {
    camelcase: 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-array-index-key': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'consistent-return': 'off',
    'prefer-promise-reject-errors': 'off',
    'func-names': 'off',
    'ecutor-return': 'off',
    'max-classes-per-file': 'off',
    'no-restricted-globals': 'off',
    'no-unused-expressions': 'off',
    'no-return-assign': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'error',
    'no-plusplus': 'off',
    'no-return-await': 'off',
    'no-use-before-define': 'off',
    'no-promise-executor-return': 'off',
    'no-async-promise-executor': 'off',
    'no-param-reassign': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/ban-types': 'off',
    // 将未使用变量的规则设置为警告而不是错误
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
