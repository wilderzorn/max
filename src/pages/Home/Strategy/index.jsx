import styles from './index.less';
import { RightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import cls from 'classnames';
import { strategyOrder } from '../Layout';

const Strategy = ({ hocState }) => {
  return (
    <div className={styles.strategy}>
      <p>多场站策略分类</p>
      <nav>
        {strategyOrder.map((key) => {
          return (
            <section
              key={key}
              className={cls(styles.item, {
                [styles.active]: hocState.checkKey === key,
              })}
            >
              <span>{key}</span>
              <RightOutlined />
            </section>
          );
        })}
      </nav>
    </div>
  );
};
export default Strategy;
