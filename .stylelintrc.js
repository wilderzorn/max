module.exports = {
  extends: require.resolve('@umijs/max/stylelint'),
  rules: {
    'value-keyword-case': null,
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'selector-class-pattern': null, // 取消 class 命名规则
    'custom-property-pattern': null, // 自定义属性的命名将不再受到任何格式限制
    'declaration-block-no-redundant-longhand-properties': null, // 禁用冗余长格式属性检查
  },
};
