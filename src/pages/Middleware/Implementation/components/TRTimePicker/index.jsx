import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { memo, useMemo } from 'react';
import { onSlideDisabled } from '../helper';
import styles from './index.less';

const TRTimePicker = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, record }) => {
    const { val = [], desc, style, key, disabledObj, disabledUniteObj } = item;

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, record),
      [disabled, disabledObj, record, disabledUniteObj],
    );

    return (
      <section
        className={styles.timePicker}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        {isTable ? null : <span className={styles.title}>{desc}</span>}
        <TimePicker
          placeholder={'请选择'}
          allowClear={true}
          format={'HH:mm'}
          style={style ?? {}}
          value={val ? dayjs(`2022-01-01 ${val}`) : null}
          disabled={slideDisabled}
          onChange={(__, timeString) => {
            onChangeValue({ [key]: timeString }, conentIndex);
          }}
        />
      </section>
    );
  },
);
export default TRTimePicker;
