import * as echarts from 'echarts';

const category = [
  '市区',
  '万州',
  '江北',
  '南岸',
  '北碚',
  '綦南',
  '长寿',
  '永川',
  '璧山',
  '江津',
  '城口',
  '大足',
  '垫江',
  '丰都',
  '奉节',
  '合川',
  '江津区',
  '开州',
  '南川',
  '彭水',
  '黔江',
  '石柱',
  '铜梁',
  '潼南',
  '巫山',
  '巫溪',
  '武隆',
  '秀山',
  '酉阳',
  '云阳',
  '忠县',
  '川东',
  '检修',
];
const lineData = [
  18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 56061,
  62677, 59521, 67560, 18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715,
  48444, 50415, 36097, 39867, 44715, 48444, 50415, 50061, 32677, 49521, 32808,
];
const barData = [
  4600, 5000, 5500, 6500, 7500, 8500, 9900, 12500, 14000, 21500, 23200, 24450,
  25250, 33300, 4600, 5000, 5500, 6500, 7500, 8500, 9900, 22500, 14000, 21500,
  8500, 9900, 12500, 14000, 21500, 23200, 24450, 25250, 7500,
];
const rateData: any = [];
for (let i = 0; i < 33; i++) {
  const rate = barData[i] / lineData[i];
  rateData[i] = rate.toFixed(2);
}

export const option = {
  title: {
    text: '增量设备贯通情况-单位',
    x: 'center',
    y: 0,
    textStyle: {
      color: '#B4B4B4',
      fontSize: 16,
      fontWeight: 'normal',
    },
  },
  backgroundColor: '#191E40',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255,255,255,0.1)',
    axisPointer: {
      type: 'shadow',
      label: {
        show: true,
        backgroundColor: '#7B7DDC',
      },
    },
  },
  legend: {
    data: ['已贯通', '计划贯通', '贯通率'],
    textStyle: {
      color: '#B4B4B4',
    },
    top: '7%',
  },
  grid: {
    x: '12%',
    width: '82%',
    y: '12%',
  },
  xAxis: {
    data: category,
    axisLine: {
      lineStyle: {
        color: '#B4B4B4',
      },
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: [
    {
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: '#B4B4B4',
        },
      },

      axisLabel: {
        formatter: '{value} ',
      },
    },
    {
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: '#B4B4B4',
        },
      },
      axisLabel: {
        formatter: '{value} ',
      },
    },
  ],

  series: [
    {
      name: '贯通率',
      type: 'line',
      smooth: true,
      showAllSymbol: true,
      symbol: 'emptyCircle',
      symbolSize: 8,
      yAxisIndex: 1,
      itemStyle: {
        color: '#F02FC2',
      },
      data: rateData,
    },

    {
      name: '已贯通',
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#956FD4' },
          { offset: 1, color: '#3EACE5' },
        ]),
      },
      data: barData,
    },

    {
      name: '计划贯通',
      type: 'bar',
      barGap: '-100%',
      barWidth: 10,
      itemStyle: {
        borderRadius: 5,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(156,107,211,0.5)' },
          { offset: 0.2, color: 'rgba(156,107,211,0.3)' },
          { offset: 1, color: 'rgba(156,107,211,0)' },
        ]),
      },
      z: -12,

      data: lineData,
    },
  ],
};
