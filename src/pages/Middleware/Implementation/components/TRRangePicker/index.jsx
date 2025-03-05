import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { memo, useMemo } from 'react';
import { onSlideDisabled } from '../helper';
import styles from './index.less';

const TRRangePicker = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, record }) => {
    const { val = [], desc, style, key, disabledObj, disabledUniteObj } = item;

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, record),
      [disabled, disabledObj, record, disabledUniteObj],
    );

    return (
      <section
        className={styles.rangePicker}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        {isTable ? null : <span className={styles.title}>{desc}</span>}
        <TimePicker.RangePicker
          allowEmpty={[true, true]}
          placeholder={['开始时间', '结束时间']}
          allowClear={true}
          format={'HH:mm'}
          style={style ?? {}}
          value={[
            val?.[0] ? dayjs(`2022-01-01 ${val[0]}`) : null,
            val?.[1] ? dayjs(`2023-01-01 ${val[1]}`) : null,
          ]}
          disabled={slideDisabled}
          onChange={(__, dateStrings) => {
            const timeString = [];
            timeString[0] = dateStrings[0] || dateStrings[1] || null;
            timeString[1] = dateStrings[1] || dateStrings[0] || null;
            onChangeValue({ [key]: timeString }, conentIndex);
          }}
        />
      </section>
    );
  },
);
export default TRRangePicker;
