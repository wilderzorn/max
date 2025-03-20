import React from 'react';
import styles from './index.less';
import { useTRState, useStaticState } from '#/hooks/trHooks';
import { Mutex } from '#/utils/mutex';
import _ from 'lodash';
import timeout from '#/utils/timeout';
import { Button } from 'antd';
import useIdleTask from '#/hooks/useIdleTask';
import runIdleTask from '#/utils/runIdleTask';

const Home = () => {
  const staticState = useStaticState({});
  const [state, setState] = useTRState({
    data: Array(100000).fill(null),
    processed: 0,
    shouldRun: false,
  });
  // 使用useMemo优化任务数组
  const tasks = React.useMemo(() => {
    return state.data.map((_, index) => () => {
      // 模拟数据处理
      const result = Math.sqrt(index) * Math.random();
      // 使用函数式更新避免闭包问题
      setState((prev) => ({ processed: prev.processed + 1 }));
    });
  }, [state.data]);

  useIdleTask(state.shouldRun ? tasks : []);
  // console.log(tasks, 'tasks');

  return (
    <div className={styles.container}>
      <Button
        onClick={() => {
          runIdleTask(() => setState({ processed: state.processed + 1 }));
        }}
      >
        {state.processed}
      </Button>
      <Button
        onClick={() => {
          setState({ shouldRun: true });
        }}
      >
        开始后台处理
      </Button>
      <Button
        onClick={() => {
          setState(() => ({ shouldRun: false, processed: 0 }));
        }}
      >
        重置
      </Button>
      <div>
        <h3>数据处理进度</h3>
        <progress value={state.processed} max={state.data.length} />
        <div>
          {state.processed}/{state.data.length} processed
        </div>
      </div>
    </div>
  );
};

export default Home;
