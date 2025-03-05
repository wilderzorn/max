import { Checkbox } from 'antd';
import { memo, useMemo } from 'react';
import { onSlideDisabled } from '../helper';
import styles from './index.less';

const TRCheckboxGroup = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, record }) => {
    const {
      val = [],
      desc,
      style,
      key,
      disabledObj,
      options,
      disabledUniteObj,
    } = item;

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, record),
      [disabled, disabledObj, record, disabledUniteObj],
    );

    return (
      <section
        className={styles.check}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        {isTable ? null : <span className={styles.title}>{desc}</span>}
        <Checkbox.Group
          options={options}
          style={style ?? {}}
          value={val}
          disabled={slideDisabled}
          onChange={(checkedValues) =>
            onChangeValue({ [key]: checkedValues }, conentIndex)
          }
        />
      </section>
    );
  },
);
export default TRCheckboxGroup;
