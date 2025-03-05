import { memo } from 'react';
import styles from './index.less';

const TRLabel = memo(({ item, isTable }) => {
  const { val = '' } = item;
  return (
    <section
      className={styles.label}
      style={{ marginTop: isTable ? 0 : '15px' }}
    >
      {val}
    </section>
  );
});
export default TRLabel;
