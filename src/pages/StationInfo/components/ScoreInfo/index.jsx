import styles from './index.less';
import AChart from '@/components/AChart';

const ScoreInfo = () => {
  return (
    <div className={styles.score}>
      <AChart
        option={{
          grid: {
            top: 20,
            left: 40,
            right: 20,
            bottom: 80,
          },
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
            data: [
              { name: '大山台风电场', itemStyle: { color: '#0a84ff' } },
              { name: '北方大区', itemStyle: { color: '#64d2ff' } },
              { name: '天润', itemStyle: { color: '#30d180' } },
            ],
          },
          radar: {
            indicator: [
              { name: '数据质量', max: 100 },
              { name: '环境温度离群', max: 100 },
              { name: '对风分布异常', max: 100 },
              { name: '全场损失电量透视', max: 100 },
              { name: '偏航系统状态检查', max: 100 },
              { name: '变流系统检查', max: 100 },
              { name: '变桨系统状态检查', max: 100 },
              { name: '发电机关键参数检查', max: 100 },
              { name: '参数一致性检查', max: 100 },
              { name: '异常状态检查', max: 100 },
            ],
            // 设置刻度数字的样式
            // name: {
            //   textStyle: {
            //     color: 'rgba(255, 255, 255, 0.6)', // 设置颜色
            //     fontSize: 12, // 设置字体大小
            //     fontWeight: '400', // 字体加粗
            //   },
            // },
            // 设置轴线颜色（从中心辐射出的实线）
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.26)', // 轴线颜色
                width: 1, // 轴线宽度
              },
            },
            // 设置标尺线（网格线）的颜色
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.26)', // 标尺线的颜色
              },
            },
            // 设置雷达图的网格区域背景色透明
            splitArea: {
              areaStyle: {
                color: 'rgba(45, 49, 59, 1)', // 盘子的背景颜色
              },
            },
          },
          series: [
            {
              type: 'radar',
              data: [
                {
                  value: [42, 30, 20, 35, 50, 18, 34, 73, 35, 86],
                  name: '大山台风电场',
                  symbol: 'none',
                  lineStyle: {
                    color: 'rgba(10, 132, 255, 1)',
                  },
                  areaStyle: {
                    // 设置填充区域的透明度
                    color: 'rgba(10, 132, 255, 0.1)', // 蓝色，透明度 0.2
                  },
                },
                {
                  value: [50, 64, 28, 26, 42, 21, 67, 74, 75, 28],
                  name: '北方大区',
                  symbol: 'none',
                  lineStyle: {
                    color: 'rgba(100, 210, 255, 1)',
                  },
                  areaStyle: {
                    // 设置填充区域的透明度
                    color: 'rgba(100, 210, 255, 0.1)', // 浅蓝色，透明度 0.2
                  },
                },
                {
                  value: [34, 21, 23, 85, 64, 63, 14, 73, 55, 86],
                  name: '天润',
                  symbol: 'none',
                  lineStyle: {
                    color: 'rgba(48, 209, 128, 1)',
                  },
                  areaStyle: {
                    // 设置填充区域的透明度
                    color: 'rgba(48, 209, 128, 0.1)', // 绿色，透明度 0.2
                  },
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
};
export default ScoreInfo;
