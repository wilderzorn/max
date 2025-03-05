import { Input } from 'antd';
import styles from './index.less';
import _ from 'lodash';
import { memo, useMemo } from 'react';
import { onSlideDisabled } from '../helper';

const TRTextArea = memo(
  ({ onChangeValue, item, disabled, isTable, conentIndex, record }) => {
    const {
      val,
      desc,
      style,
      key,
      disabledObj,
      disabledUniteObj,
      placeholder = '请输入',
      readOnly = false,
      containerStyles = {},
      autoSize = false,
    } = item;

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, record),
      [disabled, disabledObj, record, disabledUniteObj],
    );

    return (
      <section
        className={styles.textArea}
        style={{ marginTop: isTable ? 0 : '15px', ...containerStyles }}
      >
        {isTable || !desc ? null : <span className={styles.title}>{desc}</span>}
        <Input.TextArea
          autoSize={autoSize}
          style={style ?? {}}
          disabled={slideDisabled}
          value={val}
          onChange={(e) => {
            onChangeValue({ [key]: e?.target?.value ?? null }, conentIndex);
          }}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      </section>
    );
  },
);
export default TRTextArea;
