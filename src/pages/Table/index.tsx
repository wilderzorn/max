import PageLoading from '#/components/PageLoading';
import { useStaticState, useTRState } from '#/hooks/trHooks';
import { useModel } from '@umijs/max';
import { Table } from 'antd';
import { useEffect } from 'react';
import { columns } from './helper';
import styles from './index.less';
import Virtual from './virtual';
import makeWorker from '#/utils/makeWorker';

const TRTable = () => {
  const { global } = useModel('global');
  const staticState = useStaticState({
    timer: null,
    worker: null,
  });
  const [state, setState] = useTRState({
    loading: true,
    dataList: [],
  });

  useEffect(() => {
    onInitMethod();
    return () => {
      staticState?.worker?.terminate?.();
    };
  }, []);

  useEffect(() => _onHandleResize(), [global.collapsed]);

  const _onHandleResize = () => {
    if (staticState.timer) return;
    staticState.timer = setTimeout(() => {
      staticState.cache?.clearAll?.();
      clearTimeout(staticState.timer);
      staticState.timer = null;
    }, 100);
  };

  const onInitMethod = () => {
    staticState.worker = makeWorker((num) => {
      return Array(num)
        .fill(0)
        .map((__, i) => ({
          id: i,
          name: String(Date.now()),
          description: String(Date.now()),
          type: i % 2,
        }));
    });
    staticState.worker.postMessage(100);
    staticState.worker.onmessage = (event: MessageEvent<any>) => {
      setState({
        dataList: event.data,
        loading: false,
      });
    };
  };

  if (state.loading) return <PageLoading />;
  return (
    <div className={styles.container}>
      <Virtual dataList={state.dataList} />
      <div className={styles.table}>
        <Table
          bordered={true}
          virtual={true}
          columns={columns}
          rowKey="id"
          dataSource={state.dataList}
          pagination={false}
          scroll={{
            y: 870,
          }}
        />
      </div>
    </div>
  );
};
export default TRTable;
