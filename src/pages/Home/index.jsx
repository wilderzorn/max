import styles from './index.less';
import { useTRState } from '#/hooks/trHooks';
import Strategy from './Strategy';
import Content from './Content';
import { TimeRangePicker } from '@/components/index.ts';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

const MultipleDeptStrategy = () => {
  const [hocState, setHocState] = useTRState({
    checkKey: '遥测量对标',
    data: {},
  });

  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  return (
    // <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //   <TimeRangePicker
    //     value={[moment().subtract(7, 'days'), moment()]}
    //     disabledDate={disabledDate}
    //   />
    //   <RangePicker open={true} disabledDate={disabledDate} />
    // </div>
    <div className={styles.container}>
      <Strategy hocState={hocState} setHocState={setHocState} />
      <Content hocState={hocState} setHocState={setHocState} />
    </div>
  );
};

export default MultipleDeptStrategy;
