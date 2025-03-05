import styles from './index.less';
import { useTRState } from '#/hooks/trHooks';
import { SwapOutlined } from '@ant-design/icons';
import { Fragment } from 'react';

const Card = ({ title, config = {}, style = {}, children }) => {
  const { columnMap = {}, defaultKey } = config;
  const [state, setState] = useTRState({
    currentKey: defaultKey,
  });

  const keys = Object.keys(columnMap); // 获取所有的 key

  // 当前组件的索引
  const currentIndex = keys.indexOf(state.currentKey);
  // 下一个组件的索引
  const nextIndex = (currentIndex + 1) % keys.length;
  // 下一个组件的名字
  const nextComponentName = columnMap[keys[nextIndex]]?.name;

  const onchangeCompontent = () => {
    // 切换到下一个组件
    setState({
      currentKey: keys[nextIndex],
    });
  };

  return (
    <div className={styles.card} style={style}>
      <div className={styles.header}>
        <span>{title ?? columnMap?.[state.currentKey]?.name}</span>
        {keys.length > 1 && (
          <section onClick={onchangeCompontent}>
            <SwapOutlined />
            {nextComponentName}
          </section>
        )}
      </div>
      {children ? (
        <Fragment>{children}</Fragment>
      ) : (
        <div className={styles.content}>
          {columnMap[state.currentKey]?.compontent}
        </div>
      )}
    </div>
  );
};

export default Card;
