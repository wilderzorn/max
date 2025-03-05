import styles from './index.less';
import AChart from '@/components/AChart';
import dayjs from 'dayjs';

const HistoryScore = ({ data }) => {
  return (
    <div className={styles.score}>
      <AChart
        option={{
          grid: {
            top: 16,
            left: 40,
            right: 20,
            bottom: 48,
          },
          tooltip: {
            trigger: 'axis',
            borderColor: 'rgba(50, 50, 50, 0.8)', // 弹窗边框颜色
            backgroundColor: 'rgba(50, 50, 50, 0.8)', // 弹窗背景颜色
            textStyle: {
              color: '#fff', // 弹窗文字颜色
            },
            axisPointer: {
              type: 'line', // 指示线类型，可以改成'shadow'等
              lineStyle: {
                color: '#fff', // 指示线颜色
              },
            },
          },
          legend: {
            bottom: 0, // 控制 legend 的上边距
            left: 'center', // 设置 legend 居中
            itemGap: 16, // 图例之间的间距
            itemWidth: 8, // 图例标记的宽度
            itemHeight: 2, // 图例标记的高度
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)', // 图例文字颜色
              lineHeight: 10, // 文字行高
            },
            icon: 'rect', // 图例标记的形状为矩形
            data: [
              { name: '大山台风电场', itemStyle: { color: '#0a84ff' } },
              { name: '北方大区', itemStyle: { color: '#64d2ff' } },
              { name: '天润', itemStyle: { color: '#30d180' } },
            ],
          },
          xAxis: {
            type: 'category',
            boundaryGap: false, // 让曲线贴合X轴
            data: [
              '2024-10-01 08:00',
              '2024-10-01 09:00',
              '2024-10-01 10:00',
              '2024-10-01 11:00',
              '2024-10-01 12:00',
              '2024-10-01 13:00',
            ],
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(255, 255, 255, 0.4)',
              },
            },
            axisLabel: {
              formatter: function (value) {
                return dayjs(value).format('YYYYMM'); // 自定义时间格式显示
              },
              textStyle: {
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: 12,
                lineHeight: 20,
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: 'value',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.4)',
              lineHeight: 20,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(255, 255, 255, 0.4)',
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.4)',
              },
            },
          },
          series: [
            {
              name: '大山台风电场',
              type: 'line',
              data: [87, 34, 56, 77, 56, 23],
              smooth: true, // 圆滑曲线
              color: '#0a84ff', // 曲线2颜色
              symbol: 'none',
            },
            {
              name: '北方大区',
              type: 'line',
              data: [45, 68, 98, 55, 79, 56],
              smooth: true, // 圆滑曲线
              color: '#64d2ff', // 曲线3颜色
              symbol: 'none',
            },
            {
              name: '天润',
              type: 'line',
              data: [12, 33, 45, 28, 38, 59],
              smooth: true, // 圆滑曲线
              color: '#30d180', // 曲线3颜色
              symbol: 'none',
            },
          ],
        }}
      />
    </div>
  );
};

export default HistoryScore;
