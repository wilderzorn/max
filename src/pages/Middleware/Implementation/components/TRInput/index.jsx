import { Input } from 'antd';
import { memo, useMemo } from 'react';
import { onSlideDisabled } from '../helper';
import styles from './index.less';

const TRInput = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, record }) => {
    const { val, desc, style, key, disabledObj, disabledUniteObj } = item;

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, record),
      [disabled, disabledObj, record, disabledUniteObj],
    );

    return (
      <section
        className={styles.input}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        {isTable || !desc ? null : <span className={styles.title}>{desc}</span>}
        <Input
          style={style ?? {}}
          disabled={slideDisabled}
          value={val}
          onChange={(e) => {
            onChangeValue({ [key]: e?.target?.value ?? null }, conentIndex);
          }}
          placeholder={`请输入`}
        />
      </section>
    );
  },
);
export default TRInput;
