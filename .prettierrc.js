const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  pluginSearchDirs: false // 升级@umijs/fabric后， 格式化import自动排序问题
};
