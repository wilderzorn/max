import { Switch } from 'antd';
import cls from 'classnames';
import { memo, useMemo } from 'react';
import { onSlideDisabled } from '../helper';
import styles from './index.less';

const TRSwitch = memo(
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
      checkedMap,
    } = item;

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, record),
      [disabled, disabledObj, record, disabledUniteObj],
    );

    const onChange = (checked) => {
      onChangeValue(
        { [key]: checkedMap ? checkedMap[checked] : checked ? 1 : 0 },
        conentIndex,
      );
    };

    return (
      <section
        className={cls({
          [styles.switch]: true,
          [styles?.[customStyle]]: !!customStyle,
        })}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        <Switch
          size={size}
          style={style ?? {}}
          checked={!!val}
          disabled={slideDisabled}
          onChange={(checked) => onChange(checked)}
        />
        {desc ? <span className={styles.desc}>{desc}</span> : null}
      </section>
    );
  },
);
export default TRSwitch;
