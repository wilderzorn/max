import { InputNumber } from 'antd';
import { memo, useCallback, useMemo } from 'react';
import { onSlideDisabled } from '../helper';
import styles from './index.less';

const TRInputNumber = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, fullData }) => {
    const {
      val,
      desc,
      style,
      key,
      suffix,
      min = -Infinity,
      max = Infinity,
      precision = 0,
      disabledObj,
      multiplier = 1,
      disabledUniteObj,
      step = multiplier,
    } = item;

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, fullData),
      [disabled, disabledObj, fullData, disabledUniteObj],
    );

    const onParser = useCallback(
      (value) => {
        if (!value) return value;
        const relValue = Number(value?.replace(`${suffix ?? ''}`, ''));
        if (isNaN(relValue)) return value;
        if (typeof relValue === 'number') {
          return (
            Math.round(relValue * multiplier * 10 ** precision) /
            10 ** precision
          );
        }
        return value;
      },
      [multiplier, precision, suffix],
    );

    const onFormatter = useCallback(
      (value) => {
        if (!value) return value;
        const relValue = Number(value / multiplier);
        if (isNaN(relValue)) return value;
        if (typeof relValue === 'number')
          return (
            Math.round(relValue * 10 ** precision) / 10 ** precision +
            `${suffix ?? ''}`
          );
        return value;
      },
      [multiplier, precision, suffix],
    );

    return (
      <section
        className={styles.int}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        {isTable || !desc ? null : <span className={styles.title}>{desc}</span>}
        <InputNumber
          style={style ?? {}}
          disabled={slideDisabled}
          formatter={onFormatter}
          parser={onParser}
          value={val}
          min={min}
          max={max}
          precision={precision}
          onChange={(value) =>
            onChangeValue({ [key]: value ?? null }, conentIndex)
          }
          placeholder={`请输入`}
          step={step}
        />
      </section>
    );
  },
);
export default TRInputNumber;
