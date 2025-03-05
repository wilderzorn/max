/*
 * @Description: 自动复位成功率统计
 */
import AChart from '@/components/AChart';
const AutoReset = () => {
  return (
    <div>
      <AChart
        option={{
          title: {
            top: 10,
            text: '自动复位成功率统计',
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
            data: ['场站1', '场站2', '场站3', '场站4', '场站5'], // 场站名称
          },
          yAxis: [
            {
              type: 'value',
              name: '数量',
            },
            {
              type: 'value',
              name: '成功率',
              splitLine: {
                show: false, // 隐藏横向网格线
              },
              axisLabel: {
                formatter: '{value} %',
              },
              max: 100,
            },
          ],
          series: [
            {
              name: '复位成功',
              type: 'bar',
              data: [120, 200, 150, 80, 70], // 复位成功的数量
              itemStyle: {
                color: '#4da6ff', // 柱子的颜色
              },
              emphasis: {
                focus: 'series',
              },
              barWidth: 20, // 设置柱子宽度
            },
            {
              name: '复位失败',
              type: 'bar',
              data: [80, 100, 60, 30, 20], // 复位失败的数量
              itemStyle: {
                color: '#0059b3', // 柱子的颜色
              },
              emphasis: {
                focus: 'series',
              },
              barWidth: 20, // 设置柱子宽度
            },
            {
              name: '成功率',
              type: 'line',
              data: [60, 66.67, 71.43, 72.73, 77.78], // 复位成功率 (复位成功/总数)
              yAxisIndex: 1, // 使用第二个 Y 轴
              itemStyle: {
                color: '#00cc00', // 曲线的颜色
              },
              label: {
                show: false,
              },
            },
          ],
        }}
      />
    </div>
  );
};
export default AutoReset;
