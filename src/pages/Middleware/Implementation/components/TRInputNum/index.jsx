import { Input } from 'antd';
import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import styles from './index.less';
import { onSlideDisabled } from '../helper';
import { useStaticState } from '#/hooks/trHooks';
import _ from 'lodash';

const TRInputNum = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, fullData }) => {
    const {
      val,
      desc,
      style,
      key,
      suffix,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      precision = 0,
      disabledObj,
      multiplier = 1,
      disabledUniteObj,
    } = item;
    const staticState = useStaticState({
      inputValue: _.isNil(val) ? val : val / multiplier,
    });
    1;
    const [__, updeta] = useState(0);

    useEffect(() => {
      staticState.inputValue = _.isNil(val) ? val : val / multiplier;
      updeta((i) => i + 1);
    }, [val, multiplier]);

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, fullData),
      [disabled, disabledObj, fullData, disabledUniteObj],
    );

    const handleChange = useCallback(
      (e) => {
        const { value } = e.target;
        const regex = /^-?\d*\.?\d*$/; // 允许输入负数、小数点和数字

        if (regex.test(value)) {
          staticState.inputValue = value;
          onChangeValue(
            { [key]: value ? value * multiplier : null },
            conentIndex,
          );
          updeta((i) => i + 1);
        }
      },
      [conentIndex, key, multiplier, onChangeValue],
    );

    const handleBlur = useCallback(() => {
      let numValue = parseFloat(staticState.inputValue);

      if (isNaN(numValue)) {
        numValue = '';
      } else {
        if (numValue < min) {
          numValue = min; // 最小值
        } else if (numValue > max) {
          numValue = max; // 最大值
        }

        // 应用步长，并保留指定的精度
        numValue = Math.round(numValue / multiplier) * multiplier;
        numValue = numValue.toFixed(precision);
      }
      staticState.inputValue = numValue;
      onChangeValue(
        { [key]: numValue ? numValue * multiplier : null },
        conentIndex,
      );
      updeta((i) => i + 1);
    }, [
      staticState.inputValue,
      min,
      max,
      multiplier,
      precision,
      conentIndex,
      key,
      onChangeValue,
    ]);

    return (
      <section
        className={styles.num}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        {isTable || !desc ? null : <span className={styles.title}>{desc}</span>}
        <Input
          suffix={suffix}
          style={style ?? {}}
          disabled={slideDisabled}
          placeholder={`请输入`}
          value={staticState.inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </section>
    );
  },
);

export default TRInputNum;
