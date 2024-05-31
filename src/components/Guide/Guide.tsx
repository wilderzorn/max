import { Row, Typography } from 'antd';
import React from 'react';
import styles from './Guide.less';

interface Props {
  name: string;
}

// 脚手架示例组件
const Guide: React.FC<Props> = (props) => {
  const { name } = props;
  return (
    <Row>
      <Typography.Title level={1} className={styles.title}>
        欢迎使用 <strong>{name}</strong> ！
      </Typography.Title>
    </Row>
  );
};

export default Guide;
