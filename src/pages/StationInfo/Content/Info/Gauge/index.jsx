import AChart from '@/components/AChart';
import styles from './index.less';
import GaugeList from './list';

const list = [
  {
    name: '制造商PBA',
    value: 60.23,
    color: 'rgba(48, 209, 128, 1)',
    shadowColor: 'rgba(48, 209, 128, 0.5)',
  },
  {
    name: '制造商TBA',
    value: 48.47,
    color: 'rgba(255, 90, 82, 1)',
    shadowColor: 'rgba(255, 90, 82, 0.5)',
  },
  {
    name: '运营商TBA',
    value: 70.12,
    color: 'rgba(48, 209, 128, 1)',
    shadowColor: 'rgba(48, 209, 128, 0.5)',
  },
];

const Gauge = () => {
  return (
    <div className={styles.gauge}>
      <div className={styles.chart}>
        {list.map((x, xi) => {
          return (
            <AChart
              key={`${x.name}-${xi}`}
              option={{
                series: [
                  {
                    type: 'gauge',
                    progress: {
                      show: true,
                      width: 10,
                    },
                    itemStyle: {
                      color: x.color,
                      shadowColor: x.shadowColor,
                    },
                    axisLine: {
                      lineStyle: {
                        width: 10,
                      },
                    },
                    axisTick: {
                      show: false,
                    },
                    splitLine: {
                      length: 5,
                      // 刻度
                      lineStyle: {
                        width: 1,
                        color: 'rgba(255, 255, 255, 0.4)',
                      },
                    },
                    // 刻度数字
                    axisLabel: {
                      distance: 12,
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: 12,
                    },
                    anchor: {
                      show: true,
                      showAbove: true,
                      size: 12,
                      itemStyle: {
                        borderWidth: 6,
                      },
                    },
                    title: {
                      show: false,
                    },
                    detail: {
                      valueAnimation: true,
                      fontSize: 20,
                      offsetCenter: [0, '50%'],
                    },
                    data: [
                      {
                        name: x.name,
                        value: x.value,
                      },
                    ],
                  },
                ],
              }}
            />
          );
        })}
      </div>
      <GaugeList />
    </div>
  );
};
export default Gauge;
