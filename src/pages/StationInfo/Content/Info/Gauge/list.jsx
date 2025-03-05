import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VMultiGrid from 'react-virtualized/dist/commonjs/MultiGrid';
import VCellMeasurer from 'react-virtualized/dist/commonjs/CellMeasurer';
import CellMeasurerCache from 'react-virtualized/dist/commonjs/CellMeasurer/CellMeasurerCache';
import { useTRState, useStaticState } from '#/hooks/trHooks';
import React from 'react';
import { dataList, columnsRatio } from './helper';
import PageLoading from '#/components/PageLoading';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const GaugeList = () => {
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
      sorter: true,
      flex: 1,
    },
    {
      title: '设备名称',
      dataIndex: 'assetname',
      sorter: true,
      flex: 1,
    },
    {
      title: '型号名称',
      dataIndex: 'modelname',
      sorter: true,
      flex: 1,
    },
    {
      title: '统计时间',
      dataIndex: 'countTime',
      width: 300,
    },
    {
      title: '发电状态发电量(kWh)',
      dataIndex: 'power',
      sorter: true,
      width: 200,
    },
    {
      title: '理论发电量(kWh)',
      dataIndex: 'theoryPower',
      sorter: true,
      width: 150,
    },
    {
      title: '反向有功终码值',
      dataIndex: 'reverseActivePower',
      sorter: true,
      flex: 1,
    },
    {
      title: '反向有功差值',
      dataIndex: 'reverseActivePowerDiff',
      sorter: true,
      flex: 1,
    },
    {
      title: '正向有功终码值',
      dataIndex: 'forwardActivePower',
      sorter: true,
      flex: 1,
    },
    {
      title: '正向有功差值',
      dataIndex: 'forwardActivePowerDiff',
      sorter: true,
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
    return (
      <VCellMeasurer
        cache={staticState.cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        {onCellRender(style, rowIndex, columnIndex)}
      </VCellMeasurer>
    );
  };

  const onCellRender = (style, rowIndex, columnIndex) => {
    switch (rowIndex) {
      case 0:
        return (
          <div
            style={{
              ...style,
              lineHeight: `${style?.height || 0}px`,
              background: 'rgba(54, 57, 67, 1)',
              fontWeight: '500',
              padding: '0 10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderLeftColor: !columnIndex
                ? 'rgba(255, 255, 255, 0.1)'
                : 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>{columns[columnIndex].title}</span>
              {columns[columnIndex]?.sorter ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 10,
                  }}
                >
                  <CaretUpOutlined style={{ transform: 'translateY(2px)' }} />
                  <CaretDownOutlined
                    style={{ transform: 'translateY(-2px)' }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      case 1:
        return (
          <div
            style={{
              ...style,
              lineHeight: `${style?.height || 0}px`,
              background: 'rgba(45, 49, 59, 1)',
              fontWeight: '500',
              padding: '0 10px',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              borderLeft: !columnIndex
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : 'none',
            }}
          >
            {!columnIndex ? '合并' : '-'}
          </div>
        );
      default:
        return (
          <div
            style={{
              ...style,
              lineHeight: `${style?.height || 0}px`,
              padding: '0 10px',
              whiteSpace: 'nowrap',
              fontWeight: '400',
              // background: rowIndex % 2 ? '#3a3a3a' : '#313131',
              background: 'transparent',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              borderLeft: !columnIndex
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : 'none',
            }}
          >
            {onContentRender(columnIndex, rowIndex, dataList[rowIndex - 2])}
          </div>
        );
    }
  };

  const onContentRender = (columnIndex, rowIndex, item) => {
    if (columnIndex === 0) return rowIndex - 1;
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

  if (state.loading) return <PageLoading />;
  return (
    <div style={{ height: '100%', flex: 1 }}>
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
              fixedColumnCount={1}
              fixedRowCount={2}
              height={height ?? 0}
              overscanColumnCount={0}
              overscanRowCount={0}
              width={width ?? 0}
              rowCount={(dataList.length ?? 0) + 2}
              rowHeight={40}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};
export default GaugeList;
