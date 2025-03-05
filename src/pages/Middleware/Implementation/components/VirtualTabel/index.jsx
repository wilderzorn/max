import { useStaticState } from '#/hooks/trHooks';
import { s8 } from '#/utils/utils';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Fragment, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import { EmptyContent, OperationButton } from '../../index';
import RenderTemplate from '../../renderTemplate';
import { onSlideDisabled, scrollToEnd } from '../helper';
import styles from './index.less';

const VirtualTabel = memo(
  ({ onChangeValue, item, disabled, deptNum, conentIndex, fullData }) => {
    const {
      val = [],
      key,
      columns,
      isAdd,
      defaultValues = {},
      style = {},
      emptyStyle = {},
      operateList = [],
      defaultValuesObj = {},
      disabledObj,
      disabledUniteObj,
    } = item;
    const staticState = useStaticState({
      isListening: false,
    });
    const listRef = useRef(null);
    const boxRef = useRef(null);

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, fullData),
      [disabled, disabledObj, fullData, disabledUniteObj],
    );

    const onPassingData = (list) => {
      onChangeValue({ [key]: list }, conentIndex);
    };

    const onChangeItemValue = useCallback(
      (obj, index) => {
        const newList = [...(val ?? [])]?.map((v, i) => {
          if (i === index) {
            return { ...v, ...obj };
          }
          return v;
        });
        onPassingData(newList);
      },
      [onPassingData, val],
    );

    // 删除
    const onHandleDel = useCallback(
      (index) => {
        if (slideDisabled) return;
        const list = [...(val ?? [])];
        const newList = list.filter((_, i) => i !== index);
        onPassingData(newList);
      },
      [onPassingData, val],
    );

    const rowRenderer = ({ index, style, key }) => {
      const record = val?.[index] || {};
      return (
        <div style={style} key={key} className={styles.virtual_row}>
          {columns.map((j, ji) => {
            let holdHidden = false;
            if (item.key === 'singleJudgement') {
              holdHidden =
                record.type === 'singleValue' &&
                ['asset2', 'point2'].includes(j.key);
            }
            return (
              <RenderTemplate
                key={`${j.key}-${ji}-row`}
                disabled={slideDisabled}
                onHandleDel={onHandleDel}
                record={record}
                onChangeValue={onChangeItemValue}
                conentIndex={index}
                deptNum={deptNum}
                item={{
                  ...j,
                  val: record?.[j.key],
                  holdHidden,
                }}
                isTable={true}
                tableData={val}
              />
            );
          })}
        </div>
      );
    };

    // 继续添加
    const addItem = (_key) => {
      if (slideDisabled) return;
      const newList = [...(val ?? [])];
      newList.push({
        uuid: s8(),
        ...(defaultValues ?? {}),
        ...(defaultValuesObj?.[_key] ?? {}),
      });
      onPassingData(newList);
      staticState.isListening = true;
    };

    useEffect(() => {
      if (staticState.isListening) {
        const rowHeight = style?.rowHeight ?? 40;
        const listHeight = val.length * rowHeight;
        scrollToEnd(
          listRef?.current?.Grid?._scrollingContainer,
          listRef.current?.Grid?._scrollingContainer?.clientHeight ?? 0,
          listHeight,
        );
        staticState.isListening = false; // 添加完成后取消监听
      }
    }, [val]);

    function Column({ desc = '', style, hidden = false }) {
      if (hidden) return null;
      return (
        <span
          className={styles.column_header}
          style={{
            ...(style ?? {}),
          }}
        >
          {desc}
        </span>
      );
    }

    const onTableWidth = () => {
      let width = 0;
      columns
        .filter((l) => !l?.hidden)
        .forEach((s) => {
          width = width + (s?.style?.width ?? 0) + 15;
        });
      return width;
    };

    const contentHeight = useMemo(() => {
      return {
        height: style?.height ?? 210,
        listHeight: style?.height ? style.height - 50 : 160,
      };
    }, [item]);
    return (
      <section className={styles.virtual}>
        <div
          className={styles.virtual_content}
          style={{ height: `${contentHeight?.height ?? 210}px`, width: '100%' }}
        >
          <div className={styles.virtual_content_hender}>
            {columns.map((j, ji) => (
              <Fragment key={`${j.key}-${ji}-hei`}>{Column(j)}</Fragment>
            ))}
          </div>
          <div className={styles.virtual_content_table} ref={boxRef}>
            {val?.length ? (
              <AutoSizer disableHeight>
                {() => (
                  <List
                    ref={listRef}
                    className={styles.vList}
                    width={onTableWidth()}
                    height={contentHeight?.listHeight ?? 160}
                    overscanRowCount={10}
                    rowCount={val?.length ?? 0}
                    rowHeight={style?.rowHeight ?? 40}
                    rowRenderer={rowRenderer}
                    scrollToAlignment={'start'}
                  />
                )}
              </AutoSizer>
            ) : (
              <EmptyContent {...emptyStyle} />
            )}
          </div>
        </div>
        <div className={styles.virtual_footer}>
          {isAdd ? (
            <OperationButton
              disabled={slideDisabled}
              callback={addItem}
              icon={<PlusCircleOutlined />}
              name={'添加'}
            />
          ) : null}
          {!_.isEmpty(operateList)
            ? operateList.map((j) => {
                return (
                  <OperationButton
                    key={j.key}
                    disabled={slideDisabled}
                    callback={() => addItem(j.key)}
                    icon={<PlusCircleOutlined />}
                    name={j.name}
                  />
                );
              })
            : null}
        </div>
      </section>
    );
  },
);
export default VirtualTabel;
