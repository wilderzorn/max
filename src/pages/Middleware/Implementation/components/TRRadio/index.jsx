import { Radio } from 'antd';
import cls from 'classnames';
import { memo, useMemo } from 'react';
import { onSlideDisabled } from '../helper';
import styles from './index.less';

const TRRadio = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, record }) => {
    const {
      val = 0,
      desc,
      style,
      key,
      disabledObj,
      disabledUniteObj,
      size = 'small',
      customStyle,
      options = [],
    } = item;

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, record),
      [disabled, disabledObj, record, disabledUniteObj],
    );

    const onChange = (even) => {
      onChangeValue({ [key]: even?.target?.value }, conentIndex);
    };

    return (
      <section
        className={cls({
          [styles.radio]: true,
          [styles?.[customStyle]]: !!customStyle,
        })}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        {desc ? <span className={styles.desc}>{desc}</span> : null}
        <Radio.Group
          style={style}
          options={options}
          onChange={onChange}
          value={val}
          size={size}
          disabled={slideDisabled}
        />
      </section>
    );
  },
);
export default TRRadio;
