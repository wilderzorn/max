import { Checkbox } from 'antd';
import { memo, useMemo } from 'react';
import { onSlideDisabled } from '../helper';
import styles from './index.less';

const TRCheckbox = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, fullData }) => {
    const { val = 0, desc, style, key, disabledObj, disabledUniteObj } = item;
    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, fullData),
      [disabled, disabledObj, fullData, disabledUniteObj],
    );

    return (
      <section
        className={styles.check}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        <Checkbox
          style={style ?? {}}
          checked={!!val}
          disabled={slideDisabled}
          onChange={(e) =>
            onChangeValue({ [key]: e.target.checked ? 1 : 0 }, conentIndex)
          }
        >
          <span className={styles.desc}>{desc}</span>
        </Checkbox>
      </section>
    );
  },
);
export default TRCheckbox;
