/*
 * @Autor: zhangzhihao
 * @Date: 2024-07-03 14:24:15
 * @FilePath: /src/pages/Strategy/index.tsx
 * @Description: 策略配置
 */
import React from 'react';
import graphInstance, { onRegisterGraph } from './extend';
import styles from './index.less';

const Strategy = () => {
  const ref: any = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    onTreeGraph();
    () => () => {
      graphInstance?.onGraphDestroy();
    };
  }, [ref.current]);

  const onTreeGraph = () => {
    onRegisterGraph();
    graphInstance.onInitGraph(ref.current, {
      id: 'A',
      children: [
        {
          id: 'A1',
          children: [
            { id: 'A11', name: '123123' },
            { id: 'A12' },
            { id: 'A13' },
            { id: 'A14' },
          ],
        },
        {
          id: 'A2',
          children: [
            {
              id: 'A21',
              children: [{ id: 'A211' }, { id: 'A212' }],
            },
            {
              id: 'A22',
            },
          ],
        },
      ],
    });
  };

  return <div className={styles.container} ref={ref} />;
};
export default Strategy;
