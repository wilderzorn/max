import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VMultiGrid from 'react-virtualized/dist/commonjs/MultiGrid';
import VCellMeasurer from 'react-virtualized/dist/commonjs/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/commonjs/CellMeasurer/CellMeasurerCache';
import { useTRState, useStaticState } from '#/hooks/trHooks';
import PageLoading from '#/components/PageLoading';
import { columnsRatio, dataList } from './Chart/helper';
import React from 'react';
import { Pagination } from 'antd';

const VirtualTable = ({ enterType, type }) => {
  const gridRef = React.useRef();
  const staticState = useStaticState({
    cache: new CellMeasurerCache({
      defaultHeight: 40,
      fixedHeight: true,
      allRatio: 1,
      allWidth: 0,
    }),
  });
  const [state, setState] = useTRState({
    loading: true,
    page: 1,
    size: 20,
    total: 100,
  });
  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      width: 60,
    },
    {
      title: '惯线名称',
      dataIndex: 'lineName',
      flex: 1,
    },
    {
      title: '设备名称',
      dataIndex: 'assetname',
      flex: 1,
    },
    {
      title: '型号名称',
      dataIndex: 'modelname',
      flex: 1,
    },
    {
      title: '统计时间',
      dataIndex: 'countTime',
      flex: 1,
    },
    {
      title: '发电状态发电量',
      dataIndex: 'power',
      flex: 1,
    },
    {
      title: '理论发电量',
      dataIndex: 'theoryPower',
      flex: 1,
    },
    {
      title: '反向有功终码值',
      dataIndex: 'reverseActivePower',
      flex: 1,
    },
    {
      title: '反向有功差值',
      dataIndex: 'reverseActivePowerDiff',
      flex: 1,
    },
    {
      title: '正向有功终码值',
      dataIndex: 'forwardActivePower',
      flex: 1,
    },
    {
      title: '正向有功差值',
      dataIndex: 'forwardActivePowerDiff',
      flex: 1,
    },
  ];
  React.useEffect(() => {
    const { nw, nu } = columnsRatio(columns);
    staticState.allRatio = nu;
    staticState.allWidth = nw;
    setTimeout(() => {
      setState({ loading: false });
    }, 1000);
  }, []);

  const cellRenderer = ({ columnIndex, key, rowIndex, parent, style }) => {
    const dataSlide = dataList[rowIndex - 1] || {};
    return (
      <VCellMeasurer
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
              background: '#454646',
              fontWeight: 'bold',
              padding: !columnIndex ? '0 10px' : '0 4px',
            }}
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
              background: rowIndex % 2 ? '#3a3a3a' : '#313131',
            }}
          >
            {onContentRender(columnIndex, dataSlide)}
          </div>
        )}
      </VCellMeasurer>
    );
  };

  const onHeaderRender = (columnIndex) => {
    const columnSlide = columns[columnIndex] || {};
    return <div>{columnSlide.title}</div>;
  };

  const onContentRender = (columnIndex, item) => {
    const columnSlide = columns[columnIndex] || {};
    const relationObj = {};
    if (columnSlide?.render) {
      return columnSlide?.render(
        item[columnSlide?.dataIndex],
        relationObj[item[columnSlide?.dataIndex]],
        item,
      );
    }
    return item[columnSlide?.dataIndex] || '';
  };

  const paginationChange = (currentPage, pageSize) => {
    setState({
      page: currentPage,
      size: pageSize,
    });
  };

  if (state.loading) return <PageLoading />;
  return (
    <div
      style={{
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1 }}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <VMultiGrid
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
                  return Math.max(
                    Math.floor(
                      ((width - staticState.allWidth - 10) /
                        staticState.allRatio) *
                        (cl.flex ?? 1),
                    ),
                    val,
                  );
                }}
                deferredMeasurementCache={staticState.cache}
                fixedColumnCount={0}
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
      <div style={{ marginTop: 10 }}>
        <Pagination
          currentPage={state.page}
          pageSize={state.size}
          total={state.total || 0}
          pageSizeOptions={[10, 20, 50, 100, 1000]}
          showQuickJumper={true}
          size="small"
          showSizeChanger={true}
          showSizeText={false}
          paginationChange={paginationChange}
          align="end"
        />
      </div>
    </div>
  );
};
export default VirtualTable;
