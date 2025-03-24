import React from 'react';
import styles from './index.less';
import { useTRState, useStaticState } from '#/hooks/trHooks';

const Home = () => {
  const staticState = useStaticState({});
  const [state, setState] = useTRState({});

  return <div className={styles.container}>123</div>;
};

export default Home;
