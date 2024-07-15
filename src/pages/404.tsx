import { history, useModel } from '@umijs/max';
import { Button, Result } from 'antd';

const TREmpty = () => {
  const { setGlobal } = useModel('global');
  return (
    <Result
      status="404"
      title="404"
      subTitle="找不到该页面"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push('/home');
            setGlobal({ pathname: '/home' });
          }}
        >
          返回
        </Button>
      }
    />
  );
};

export default TREmpty;
