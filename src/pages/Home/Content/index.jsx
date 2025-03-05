import styles from './index.less';
import RenderTemplate from '@/pages/Middleware/Implementation/renderTemplate.jsx';
import { useMemo, useCallback } from 'react';
import orderMap from '../Layout';
import { Button } from 'antd';

const Content = ({ hocState, setHocState }) => {
  const list = useMemo(
    () => orderMap.get(hocState.checkKey),
    [orderMap, hocState],
  );

  const memoizedOnChangeValue = useCallback(
    (obj) => {
      setHocState({ data: { ...hocState.data, ...obj } });
    },
    [hocState],
  );

  return (
    <div className={styles.content}>
      <h1>Welcome to our website!</h1>
      <div className={styles.implementation}>
        {list.map((j, i) => {
          const memoizedItem = useMemo(
            () => ({
              ...j,
              val: hocState.data?.[j.key],
            }),
            [j, hocState.data],
          );
          return (
            <RenderTemplate
              key={`${i}-${j.key}-list`}
              item={memoizedItem}
              disabled={false}
              deptNum={null}
              onChangeValue={memoizedOnChangeValue}
              conentIndex={i}
              record={hocState.data}
              fullData={hocState.data}
            />
          );
        })}
      </div>
      <div className={styles.foot}>
        <Button
          type="primary"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log(hocState.data, 'hocState');
          }}
        >
          保存
        </Button>
      </div>
    </div>
  );
};

export default Content;
