module.exports = {
  extends: require.resolve('@umijs/max/stylelint'),
  rules: {
    'value-keyword-case': null,
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'selector-class-pattern': null, // 取消 class 命名规则
  },
};
