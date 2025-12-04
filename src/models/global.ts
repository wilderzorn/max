// 全局共享数据示例
import { useTRState } from '#/hooks/trHooks';
import { DEFAULT_NAME } from '@/constants';
import { useEffect } from 'react';
// import { getLocale } from '@umijs/max';
import IndexedDBWrapper from '#/utils/indexedDBWrapper';

// 创建 IndexedDB 实例
const globalDB = new IndexedDBWrapper('app_global_db', 1, [
  {
    name: 'global_store',
    keyPath: 'id',
  },
]);

// 默认状态
const DEFAULT_STATE = {
  name: DEFAULT_NAME,
  theme: 'dark' as const,
  pathname: '/home',
  collapsed: true,
  // locale: getLocale?.() ?? 'zh-CN',
  locale: 'zh-CN',
  themeOptions: {
    colorPrimary: '#1677ff',
    borderRadius: 5,
  },
};

const Global = () => {
  const [state, setState] = useTRState<typeof DEFAULT_STATE>(DEFAULT_STATE);

  // 加载保存的状态
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        await globalDB.connect();
        const saved = await globalDB.getByKey<{ id: string; data: any }>(
          'global_store',
          'global_data',
        );
        if (saved?.data) {
          setState(saved.data);
        }
      } catch (error) {
        console.warn('Failed to load state:', error);
      }
    };
    loadSavedState();
  }, []);

  const onChange = async (data: any) => {
    const newState = {
      ...state,
      ...data,
    };

    setState(newState);
    // 异步保存到 IndexedDB
    try {
      await globalDB.safePut('global_store', {
        id: 'global_data',
        data: newState,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error('Failed to persist state:', error);
    }
  };

  return {
    global: state,
    setGlobal: onChange,
  };
};

export default Global;
