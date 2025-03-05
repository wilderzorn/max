/*
 * @Description: 策略推送准确性统计
 */
import AChart from '@/components/AChart';

const StrategyPush = () => {
  return (
    <div>
      <AChart
        option={{
          title: {
            top: 10,
            text: '策略推送准确性统计',
            left: 'center',
            textStyle: {
              fontSize: 18,
              color: '#fff',
            },
          },
          tooltip: {
            top: 20,
            left: 40,
            right: 20,
            bottom: 80,
            trigger: 'axis',
          },
          legend: {
            bottom: 0,
            left: 'center',
            itemGap: 16,
            itemWidth: 8,
            itemHeight: 6,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: 10, // 文字行高
            },
            icon: 'rect',
          },
          xAxis: {
            type: 'category',
            data: ['风机', '电气'], // 添加类别
          },
          yAxis: [
            {
              type: 'value',
              name: '数量',
            },
            {
              type: 'value',
              name: '比例',
              axisLabel: {
                formatter: '{value} %',
              },
              splitLine: {
                show: false, // 隐藏横向网格线
              },
              max: 100, // 设置最大值为 100%
            },
          ],
          series: [
            {
              name: '准确',
              type: 'bar',
              stack: '设备', // 设置为同一堆叠组
              data: [400, 300], // 风机和电气的准确数据
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#4da6ff',
              },
              barWidth: 20, // 设置柱子宽度
            },
            {
              name: '不准确',
              type: 'bar',
              stack: '设备', // 设置为同一堆叠组
              data: [100, 50], // 风机和电气的不准确数据
              emphasis: {
                focus: 'series',
              },
              itemStyle: {
                color: '#0059b3',
              },
              barWidth: 20, // 设置柱子宽度
            },
            {
              name: '比例',
              type: 'line',
              yAxisIndex: 1,
              data: [40, 30], // 风机和电气的比例
              label: {
                show: false,
              },
              itemStyle: {
                color: '#00cc00',
              },
            },
          ],
        }}
      />
    </div>
  );
};
export default StrategyPush;
