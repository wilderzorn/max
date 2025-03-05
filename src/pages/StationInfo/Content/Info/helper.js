export const tabs = [
  {
    name: 'PBA',
    key: 'PBA',
    type: 'gauge', // 仪表盘
  },
  {
    name: '数据质量',
    key: 'dataQuality',
    type: 'scatter', // 散点图
  },
  {
    name: '环境温度离群',
    key: 'temperature',
    type: 'gauge',
  },
  {
    name: '异常状态检查',
    key: 'abnormal',
    type: 'gauge',
  },
  {
    name: '对风分布异常',
    key: 'abnormalWind',
    type: 'scatter',
  },
  {
    name: '参数一致性检查',
    key: 'paramCheck',
    type: 'gauge',
  },
  {
    name: '全场损失电量透视',
    key: 'lossPower',
    type: 'gauge',
  },
  {
    name: '发电机关关键参数检查',
    key: 'powerUnit',
    type: 'scatter',
  },
  {
    name: '偏航系统状态检查',
    key: 'yawSystem',
    type: 'gauge',
  },
  {
    name: '变桨系统状态检查',
    key: 'pitchSystem',
    type: 'scatter',
  },
];
