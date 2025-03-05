import { MinusCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import classnames from 'classnames';
import { memo, useMemo } from 'react';
import {
  TRCheckbox,
  TRCheckboxGroup,
  TRChunkTable,
  TRInput,
  TRInputNum,
  TRInputNumber,
  TRLabel,
  TRMulSelect,
  TRNumberRange,
  TRRadio,
  TRRangePicker,
  TRSelect,
  TRSwitch,
  TRTextArea,
  TRTimePicker,
  VirtualTabel,
} from './components';
import styles from './index.less';
import { isDevelopment } from '#/utils/utils';
import runIdleTask from '#/utils/runIdleTask';

const RenderTemplate = memo(
  ({
    item,
    record,
    conentIndex,
    disabled,
    onChangeValue,
    onHandleDel,
    deptNum,
    isTable = false,
    tableData = [],
    fullData,
  }) => {
    const { dataType, hidden = false, holdHidden = false, ...itemProps } = item;
    const props = {
      disabled,
      item: itemProps,
      onChangeValue: (...args) => runIdleTask(() => onChangeValue(...args)),
      isTable,
      conentIndex,
      record,
      deptNum,
      tableData,
      fullData,
    };
    if (hidden) return null;
    if (holdHidden) {
      return (
        <div style={{ marginRight: '15px', ...(itemProps?.style ?? {}) }} />
      );
    }

    const componentMap = useMemo(
      () => ({
        int: TRInputNumber,
        virtualTabel: VirtualTabel,
        multiple: TRMulSelect,
        select: TRSelect,
        checkbox: TRCheckbox,
        checkboxGroup: TRCheckboxGroup,
        rangePicker: TRRangePicker,
        label: TRLabel,
        timePicker: TRTimePicker,
        input: TRInput,
        numberRange: TRNumberRange,
        switch: TRSwitch,
        radio: TRRadio,
        textArea: TRTextArea,
        chunkTable: TRChunkTable,
        num: TRInputNum,
        operationDel: () => (
          <>
            {isDevelopment() ? (
              <MinusCircleOutlined
                onClick={() => onHandleDel?.(conentIndex)}
                className={classnames({
                  [styles.deleteBtn]: true,
                  [styles.deleteBtn_disabled]: disabled,
                })}
              />
            ) : (
              <Popconfirm
                title="是否确认删除?"
                onConfirm={() => onHandleDel?.(conentIndex)}
                okText="确认"
                cancelText="取消"
                disabled={disabled}
              >
                <MinusCircleOutlined
                  className={classnames({
                    [styles.deleteBtn]: true,
                    [styles.deleteBtn_disabled]: disabled,
                  })}
                />
              </Popconfirm>
            )}
          </>
        ),
        default: TRInput,
        br: () => <div style={{ flexBasis: '100%', height: 0 }} />,
      }),
      [onHandleDel, disabled, conentIndex],
    );

    const Component = componentMap[dataType] || componentMap.default;
    return <Component {...props} />;
  },
);

export default RenderTemplate;
