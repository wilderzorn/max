import { pinyin } from 'pinyin-pro';

/**
 * 获取拼音 https://pinyin-pro.cn/use/pinyin.html
 * none: 全拼
 * first: 首拼
 */
export const getPinyin = (value = '', type = 'none') => {
  // 根据 type 参数动态选择配置
  let options = {};
  if (type === 'none') {
    options = { toneType: 'none' }; // 不带音调的全拼
  } else if (type === 'first') {
    options = { pattern: 'first' }; // 只返回首字母
  }

  return pinyin(value, options).replace(/\W/g, '');
};
