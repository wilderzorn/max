import { Empty } from 'antd';
import empty_dark from '@/assets/img/empty_dark.png';
import empty from '@/assets/img/empty.png';
import { useModel } from '@umijs/max';

const TREmpty = () => {
  const { global } = useModel('global');
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Empty
        image={global.theme === 'dark' ? empty_dark : empty}
        imageStyle={{ height: 300 }}
        description={
          <span
            style={{
              color: global.theme === 'dark' ? '#fff' : '#000',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            404
          </span>
        }
      />
    </div>
  );
};

export default TREmpty;
