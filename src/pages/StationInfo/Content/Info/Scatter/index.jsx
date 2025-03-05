import AChart from '@/components/AChart';
import styles from './index.less';

const Scatter = () => {
  return (
    <div className={styles.scatter}>
      <div className={styles.message}>
        <p>
          环境温度对机组影响主要表现在两方面：一是机组需要根据环境温度进行功率曲线进行自寻优，环境温度测量偏差超过5度时会影响寻优结果，将产生1%-3%的发电量损失；二是机组根据环境温度进行自我保护，当机组测量环境温度过高或过低时会导致机组提前停机保护，导致发电量损失、机组利用率降低。因此，有必要对机组环境温度定期检查，避免产生发电损失。本章节仅利用2022年5月份10min数据对机组的塔底环境温度和轮毂高度处环境温度进行离群检查。
        </p>
        <p>
          从全场22年5月份环境温度特征散点来看，全场未发现环境温度离群机组。下图中横轴为平均环境温度，纵轴为环境温度标准差，标记三种类型：数值超限机组（无）、离群机组（无）、正常机组（绿色点）。
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <AChart
          option={{
            tooltip: { top: 20, left: 40, right: 20, bottom: 80 },
            legend: {
              bottom: 0,
              left: 'center',
              itemGap: 16,
              itemWidth: 8,
              itemHeight: 2,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 10, // 文字行高
              },
              icon: 'rect',
            },
            xAxis: {
              name: '平均温度差',
              splitLine: {
                show: false,
              },
              // axisLine: {
              //   lineStyle: {
              //     color: 'red',
              //   },
              // },
            },
            yAxis: {
              name: '环境维度标准差',
              axisLine: {
                show: false,
              },
              splitLine: {
                show: true, // 显示分隔线
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.4)', // 纵向分隔线的颜色
                },
              },
            },
            series: [
              {
                name: '数值超限机组',
                type: 'scatter',
                data: [
                  [34, 46],
                  [12, 89],
                  [16, 38],
                  [34, 32],
                  [82, 88],
                ],
                itemStyle: {
                  color: 'rgba(255, 90, 82, 1)',
                },
              },
              {
                name: '离群机组',
                type: 'scatter',
                data: [
                  [50, 32],
                  [92, 12],
                  [80, 54],
                  [46, 19],
                  [11, 49],
                ],
                itemStyle: {
                  color: 'rgba(255, 167, 31, 1)',
                },
              },
              {
                name: '正常机组',
                type: 'scatter',
                data: [
                  [99, 33],
                  [22, 75],
                  [87, 13],
                  [21, 46],
                  [87, 84],
                ],
                itemStyle: {
                  color: 'rgba(48, 209, 128, 1)',
                },
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
export default Scatter;
