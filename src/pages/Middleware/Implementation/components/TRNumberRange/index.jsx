import { InputNumber } from 'antd';
import _ from 'lodash';
import { memo, useCallback, useMemo } from 'react';
import { onSlideDisabled } from '../helper';
import styles from './index.less';

const INPUT_TYPE = {
  MIN: 0, // 最小值
  MAX: 1, // 最大值
};

const TRNumberRange = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, record }) => {
    const {
      val = [],
      desc,
      style,
      key,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      suffix,
      disabledObj,
      disabledUniteObj,
      precision = 0,
      multiplier = 1,
      step = multiplier,
      placeholder = ['最小值', '最大值'],
      separator = '~',
      ...inputNumberProps
    } = item;

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, record),
      [disabled, disabledObj, record, disabledUniteObj],
    );

    const handleBlur = () => {
      const [min, max] = val ?? [];
      if (isTruthy(min)) return;
      if (isTruthy(max)) return;
      onChangeValue(
        { [key]: _.gt(min, max) ? [max, min] : [min, max] },
        conentIndex,
      );
    };

    const isTruthy = (value) => {
      if (value === 0 || value === '0') {
        return false;
      }
      return !value;
    };

    // 输入值失去焦点回调
    const handleChangeValue = (value, type) => {
      const result = !isTruthy(value) ? _.toNumber(value) : null;
      const [min, max] = val ?? [];
      switch (type) {
        case INPUT_TYPE.MIN:
          onChangeValue({ [key]: [result, max] }, conentIndex);
          break;
        case INPUT_TYPE.MAX:
          onChangeValue({ [key]: [min, result] }, conentIndex);
          break;
      }
    };

    const onFormatter = useCallback(
      (value) => {
        if (!value) return value;
        const relValue = Number(value / multiplier);
        if (isNaN(relValue)) return value;
        if (typeof relValue === 'number')
          return Math.round(relValue * 10 ** precision) / 10 ** precision;
        return value;
      },
      [multiplier, precision],
    );

    const onParser = useCallback(
      (value) => {
        if (!value) return value;
        const relValue = Number(value);
        if (isNaN(relValue)) return value;
        if (typeof relValue === 'number')
          return (
            Math.round(relValue * multiplier * 10 ** precision) /
            10 ** precision
          );
        return value;
      },
      [multiplier, precision],
    );

    // 渲染输入框
    const renderInputNumber = (type) => (
      <InputNumber
        {...inputNumberProps}
        disabled={slideDisabled}
        min={min}
        max={max}
        value={val?.[type] ?? null}
        precision={precision}
        placeholder={placeholder[type]}
        onChange={(e) => handleChangeValue(e, type)}
        style={style ?? {}}
        step={step}
        formatter={onFormatter}
        parser={onParser}
        onBlur={handleBlur}
      />
    );

    return (
      <section
        className={styles.num}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        {isTable || !desc ? null : <span className={styles.title}>{desc}</span>}
        <div className={styles.content}>
          {renderInputNumber(INPUT_TYPE.MIN)}
          <span>{separator}</span>
          {renderInputNumber(INPUT_TYPE.MAX)}
        </div>
        {suffix && <span>{suffix}</span>}
      </section>
    );
  },
);
export default TRNumberRange;
