import { Table } from 'antd';
import { columns, dataList } from './helper';
import styles from './index.less';
import { useRef } from 'react';
import { useSize } from 'ahooks';

const TrTable = () => {
  const tableRef = useRef(null);
  const size = useSize(tableRef);
  return (
    <div className={styles.table} ref={tableRef}>
      <Table
        virtual
        columns={columns}
        scroll={{
          x: size?.width ?? 400,
          y: (size?.height ?? 400) - 50,
        }}
        rowKey="id"
        dataSource={dataList}
        pagination={false}
      />
    </div>
  );
};
export default TrTable;
