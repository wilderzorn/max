import React from 'react';
import styles from './index.less';
import { useTRState, useStaticState } from '#/hooks/trHooks';
import { Mutex } from '#/utils/mutex';
import _ from 'lodash';
import timeout from '#/utils/timeout';

const Home = () => {
  const staticState = useStaticState({
    mutex: new Mutex(2),
    resourcePool: ['Resource A', 'Resource B'],
  });
  const [state, setState] = useTRState({});

  React.useEffect(() => {
    timeout();
    useResource(1);
    useResource(2);
    useResource(3);
  }, []);

  const useResource = async (id) => {
    await staticState.mutex.acquire(); // 请求资源
    const resource = staticState.resourcePool.pop();
    // console.log(`Task ${id} is using ${resource}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟资源使用
    // console.log(`Task ${id} finished using ${resource}`);
    staticState.resourcePool.push(resource); // 释放资源
    staticState.mutex.release(); // 释放锁
  };

  return <div className={styles.container}>111</div>;
};

export default Home;
