import React from 'react';
import styles from './index.less';
import { useTRState, useStaticState } from '#/hooks/trHooks';
import _ from 'lodash';
import { useModel } from '@umijs/max';
import useAlert from '#/hooks/useAlert';
// import WindTurbine from '@/components/WindTurbine';
import { getPinyin } from './helper';
import { TRVirtualTable } from '#/components';

const Home = () => {
  const [alert, AlertContext] = useAlert();
  const { global } = useModel('global');
  const staticState = useStaticState({});
  const [state, setState] = useTRState({ treeData: [] });
  const bane = '你好世界';

  return (
    <div className={styles.container}>
      {AlertContext}
      <div className={styles.page}>
        <div style={{ padding: '20px' }}>
          <h3>getPinyin 函数测试：</h3>
          <div>原始文本: "你好世界"</div>
          <div>{getPinyin(bane, '')}</div>
          <div>{getPinyin(bane, 'none')}</div>
          <div>{getPinyin(bane, 'first')}</div>
        </div>
        <TRVirtualTable
          headerHeight={40}
          columns={[
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              flex: 1,
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
              flex: 1,
              sort: true,
            },
          ]}
          dataList={[
            {
              name: '张三',
              age: 25,
            },
            {
              name: '李四',
              age: 30,
            },
          ]}
          pagination={{
            size: 'small',
            total: 100,
            current: 1,
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共计 ${100} 条`,
          }}
          onChange={(params) => {
            // console.log('表格变化:', params);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
