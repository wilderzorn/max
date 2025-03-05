import PaneHoc from '#/components/PaneHoc';
import { strategyOrder } from '@/pages/Middleware/Implementation/layout';
import { Select } from 'antd';
import { useEffect } from 'react';
import Content from './content';
import { __staticData } from './helper';
import styles from './index.less';

const Middleware = PaneHoc(({ hocState, setHocState }) => {
  useEffect(() => {
    setHocState({ staticData: __staticData?.[hocState.selectValue] });
  }, [hocState.selectValue]);

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '20px' }}>
        <Select
          placeholder="请选择"
          value={hocState.selectValue}
          style={{ width: 300 }}
          allowClear
          options={strategyOrder.map((k) => ({ label: k, value: k }))}
          onChange={(value) => {
            setHocState({ selectValue: value });
          }}
        />
      </div>
      <Content {...hocState} />
    </div>
  );
});
export default Middleware;
