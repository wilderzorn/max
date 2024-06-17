import { useStaticState, useTRState } from '#/utils/trHooks.jsx';
import { useEffect } from 'react';
import styles from './index.less';
import { useModel } from '@umijs/max';
import PageLoading from '#/components/PageLoading';
import Virtual from './virtual';
import TrTable from './trTable';

const Table = () => {
  const { global } = useModel('global');
  const staticState = useStaticState({
    timer: null,
  });
  const [state, setState] = useTRState({
    loading: true,
  });

  useEffect(() => {
    onInitMethod();
  }, []);

  useEffect(() => _onHandleResize(), [global.collapsed]);

  const _onHandleResize = () => {
    if (staticState.timer) return;
    staticState.timer = setTimeout(() => {
      staticState.cache?.clearAll();
      clearTimeout(staticState.timer);
      staticState.timer = null;
    }, 100);
  };

  const onInitMethod = () => {
    setTimeout(() => {
      setState({ loading: false });
    }, 2000);
  };

  if (state.loading) return <PageLoading />;
  return (
    <div className={styles.container}>
      <Virtual />
      <TrTable />
    </div>
  );
};
export default Table;
