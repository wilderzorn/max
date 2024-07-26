// 全局共享数据示例
import { useTRState } from '#/hooks/trHooks';
import { DEFAULT_NAME } from '@/constants';
import { getLocale } from '@umijs/max';
const Global = () => {
  const [global, setGlobal] = useTRState({
    name: DEFAULT_NAME,
    theme: 'dark',
    pathname: '/home', // 当前路由地址
    collapsed: true,
    locale: getLocale?.() ?? 'zh-CN', // 获取当前系统语言
    // 主题配置
    themeOptions: {
      colorPrimary: '#1677ff',
      borderRadius: 5,
    },
  });
  return {
    global,
    setGlobal,
  };
};

export default Global;
