import PageLoading from '#/components/PageLoading';
import { useStaticState, useTRState } from '#/utils/trHooks';
import { useModel } from '@umijs/max';
import { Table } from 'antd';
import React, { useEffect } from 'react';
import { columns, dataList } from './helper';
import styles from './index.less';
import Virtual from './virtual';

const TRTable = () => {
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
    }, 1000);
  };

  if (state.loading) return <PageLoading />;
  return (
    <div className={styles.container}>
      <Virtual />
      <div className={styles.table}>
        <Table
          bordered={true}
          virtual={true}
          columns={columns}
          rowKey="id"
          dataSource={dataList}
          pagination={false}
          scroll={{
            y: 918,
          }}
        />
      </div>
    </div>
  );
};
export default TRTable;
