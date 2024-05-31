import { AutoSizer, MultiGrid, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { useStaticState, useTRState } from '@/utils/trHooks.jsx';
import { useEffect, useRef } from 'react';
import { columns, dataList, columnsRatio } from './helper';
import { Checkbox } from 'antd';
import styles from './index.less';
import PageLoading from '@/components/PageLoading';
import cls from 'classnames';
import { useModel } from '@umijs/max';

const Table = () => {
  const { global } = useModel('global');
  const gridRef = useRef<any>(null);
  const staticState = useStaticState({
    cache: new CellMeasurerCache({
      defaultHeight: 40,
      fixedHeight: true,
    }),
    selectedRowKeys: {},
    allRatio: 1,
    allWidth: 0,
    timer: null,
  });
  const [state, setState] = useTRState({
    dataList: [],
    checkList: [],
    loading: true,
  });

  useEffect(() => {
    onInitMethod();
  }, []);

  useEffect(() => _onHandleResize(), [global.collapsed]);

  const _onHandleResize = () => {
    if (staticState.timer) return;
    staticState.timer = setTimeout(() => {
      staticState.cache?.clearAll();
      clearTimeout(staticState.timer);
      staticState.timer = null;
    }, 100);
  };

  const onInitMethod = () => {
    const { nw, nu } = columnsRatio(columns);
    staticState.allRatio = nu;
    staticState.allWidth = nw;
    setState({ loading: false });
  };

  const cellRenderer = ({ columnIndex, key, rowIndex, parent, style }) => {
    const dataSlide = dataList[rowIndex - 1] || {};
    return (
      <CellMeasurer
        cache={staticState.cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        {rowIndex === 0 ? (
          <div
            style={{
              ...style,
              lineHeight: `${style?.height || 0}px`,
              fontWeight: 'bold',
              padding: !columnIndex ? '0 10px' : '0 4px',
            }}
            className={styles.row_even}
          >
            {onHeaderRender(columnIndex)}
          </div>
        ) : (
          <div
            style={{
              ...style,
              lineHeight: `${style?.height || 0}px`,
              padding: !columnIndex ? '0 10px' : '0 4px',
              whiteSpace: 'nowrap',
            }}
            className={cls({
              [styles.row_odd]: rowIndex % 2 === 1,
              [styles.row_even]: rowIndex % 2 === 0,
            })}
          >
            {onContentRender(columnIndex, dataSlide)}
          </div>
        )}
      </CellMeasurer>
    );
  };
  const onHeaderRender = (columnIndex) => {
    const columnSlide = columns[columnIndex] || {};
    if (columnIndex === 0) {
      const arr = state.checkList;
      const isCheck = arr.length > 0 && arr.length === dataList.length;
      return (
        <Checkbox
          indeterminate={arr.length > 0 && arr.length < dataList.length}
          checked={isCheck}
          style={{ margin: 'auto' }}
          onClick={() => {
            const selectedRowKeys = {};
            if (isCheck) {
              dataList
                ?.filter((s: any) => s?.check !== 'all')
                ?.forEach((a) => {
                  selectedRowKeys[a?.id] = { ...a };
                });
            }
            setState({
              checkList: isCheck ? [] : dataList.map((n) => n.id),
            });
            staticState.selectedRowKeys = { ...(selectedRowKeys ?? {}) };
          }}
        />
      );
    }
    return <div>{columnSlide.title}</div>;
  };

  const onContentRender = (columnIndex, item) => {
    if (columnIndex === 0) {
      const idVal = item.id;
      let arr = state.checkList;
      return (
        <Checkbox
          checked={arr.includes(idVal)}
          style={{ margin: 'auto' }}
          onClick={() => {
            const _selectedRowKeys = { ...(staticState.selectedRowKeys || {}) };
            if (idVal) {
              if (arr.includes(item.id)) {
                arr = arr.filter((l) => l !== idVal);
                delete _selectedRowKeys[idVal];
              } else {
                arr.push(idVal);
                _selectedRowKeys[idVal] = {
                  ...(dataList.find((v) => v.id === idVal) ?? {}),
                };
              }
              setState({
                checkList: arr,
              });
              staticState.selectedRowKeys = { ...(_selectedRowKeys ?? {}) };
            }
          }}
        />
      );
    }
    const columnSlide: any = columns[columnIndex] || {};
    const relationObj = {};
    if (columnSlide?.dataIndex === 'btns') {
      return (
        <>
          {columnSlide.btns.map((j) => {
            return (
              <a
                key={j.key}
                style={{ marginRight: '8px' }}
                // onClick={() => onHandleSlie(j.key, item)}
              >
                {j.label}
              </a>
            );
          })}
        </>
      );
    }
    if (columnSlide?.render) {
      return columnSlide?.render(
        item[columnSlide?.dataIndex],
        relationObj[item[columnSlide?.dataIndex]],
        item,
      );
    }
    return item[columnSlide?.dataIndex] || '';
  };

  if (state.loading) return <PageLoading />;
  return (
    <div className={styles.container}>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <MultiGrid
              ref={gridRef}
              style={{ overflowY: 'hidden' }}
              cellRenderer={cellRenderer}
              columnCount={columns.length || 0}
              columnWidth={({ index }) => {
                const cl = columns[index];
                if (cl.width) return cl.width;
                let val = staticState.cache._columnWidthCache[`0-${index}`];
                if (!val) {
                  val = 100;
                }
                const trWidth = Math.max(
                  Math.floor(
                    ((width - staticState.allWidth - 10) / staticState.allRatio) * (cl.flex ?? 1),
                  ),
                  val,
                );
                return trWidth;
              }}
              deferredMeasurementCache={staticState.cache}
              fixedColumnCount={1}
              fixedRowCount={1}
              height={height ?? 0}
              overscanColumnCount={0}
              overscanRowCount={0}
              width={width ?? 0}
              rowCount={(dataList.length ?? 0) + 1}
              rowHeight={40}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};
export default Table;
