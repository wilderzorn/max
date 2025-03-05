import styles from './index.less';
import AutoReset from './Chart/AutoReset';
import StrategyPush from './Chart/StrategyPush';
import ChartPie from './Chart/ChartPie';
const ChartMerge = ({ state }) => {
  return (
    <div className={styles.chart}>
      <div>
        <StrategyPush />
        <AutoReset />
      </div>
      <div>
        <ChartPie title="分发渠道统计" />
        <ChartPie title="板子通知类型占比" />
        <ChartPie title="云电话统计类型占比" />
      </div>
    </div>
  );
};
export default ChartMerge;
