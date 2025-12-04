module.exports = {
  // printWidth: 100, // 每行最大字符数为 100
  singleQuote: true, // 使用单引号而不是双引号
  trailingComma: 'all', // 在多行结构中始终添加尾随逗号
  proseWrap: 'never', // 禁止在文本中自动换行
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  overrides: [{ files: '.prettierrc', options: { parser: 'json' } }],
  plugins: [
    // 'prettier-plugin-organize-imports', // import 排序 组合 去除无用
    'prettier-plugin-packagejson', // package.json 里面的 key 好好排序
  ],
  pluginSearchDirs: false, // 格式化import自动排序问题
};
