// 全局共享数据示例
import { useTRState, useStaticState } from '#/index';
import { DEFAULT_NAME } from '@/constants';
import { useEffect } from 'react';
import { getLocale } from '@umijs/max';
import IndexedDBWrapper from '#/utils/indexedDBWrapper';

interface DEFAULT_STATE {
  name: typeof DEFAULT_NAME;
  theme: 'dark' | 'light';
  pathname: string;
  collapsed: boolean;
  locale: 'zh-CN' | 'en-US';
  themeOptions: {
    colorPrimary: string;
    borderRadius: number;
  };
}

const Global = () => {
  const [state, setState] = useTRState<DEFAULT_STATE>({
    name: DEFAULT_NAME,
    theme: 'dark',
    pathname: '/home',
    collapsed: true,
    themeOptions: {
      colorPrimary: '#1677ff',
      borderRadius: 5,
    },
    locale: getLocale?.() ?? 'zh-CN',
  });

  const staticState = useStaticState({
    timer: null,
    db: new IndexedDBWrapper('app_global_db', 1, [
      {
        name: 'global_store',
        keyPath: 'id',
      },
    ]),
  });

  // 加载保存的状态
  useEffect(() => {
    const loadSavedState = async () => {
      await staticState.db.connect();
      try {
        const saved = await staticState.db.getByKey(
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

  const onChangedb = (data: any) => {
    if (staticState.timer) return;
    staticState.timer = setTimeout(() => {
      try {
        staticState.db.safePut('global_store', {
          id: 'global_data',
          data: data,
          updatedAt: Date.now(),
        });
      } catch (error) {
        console.error('Failed to persist state:', error);
      } finally {
        clearTimeout(staticState.timer);
        staticState.timer = null;
      }
    }, 10);
  };

  const onChange = (data: any) => {
    setState((prev) => ({ ...prev, ...data }));
    onChangedb({ ...state, ...data });
  };

  return {
    global: state,
    setGlobal: onChange,
  };
};

export default Global;
