// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useTRState } from '#/utils/trHooks.jsx';

const Global = () => {
  const [global, setGlobal] = useTRState({
    name: DEFAULT_NAME,
    theme: 'dark',
    pathname: '/home', // 当前路由地址
    collapsed: true,
    themeColor: '#1677ff',
  });
  return {
    global,
    setGlobal,
  };
};

export default Global;
