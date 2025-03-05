import AGC异常 from './AGC异常.json';
import AVC异常 from './AVC异常.json';
import 光伏故障 from './光伏故障.json';
import 单据关闭及时性 from './单据关闭及时性.json';
import 测风塔 from './测风塔.json';
import 环境监测仪 from './环境监测仪.json';
import 电气故障 from './电气故障.json';
import 自动公告 from './自动公告.json';
import 超风速工作预警 from './超风速工作预警.json';
import 通讯中断 from './通讯中断.json';
import 遥测量异常 from './遥测量异常.json';
import 风功率预测 from './风功率预测.json';
import 风机异常停机 from './风机异常停机.json';
import 风机故障 from './风机故障.json';
import 风机警告 from './风机警告.json';
import 风机预警告警 from './风机预警告警.json';
import 定制推送 from './定制推送.json';

const orderMap = new Map([
  ['风机故障', 风机故障],
  ['风机警告', 风机警告],
  ['风机异常停机', 风机异常停机],
  ['风机预警告警', 风机预警告警],
  ['AVC异常', AVC异常],
  ['AGC异常', AGC异常],
  ['电气故障', 电气故障],
  ['光伏故障', 光伏故障],
  ['单据关闭及时性', 单据关闭及时性],
  ['遥测量异常', 遥测量异常],
  ['测风塔', 测风塔],
  ['环境监测仪', 环境监测仪],
  ['超风速工作预警', 超风速工作预警],
  ['风功率预测', 风功率预测],
  ['通讯中断', 通讯中断],
  ['自动公告', 自动公告],
  ['定制推送', 定制推送],
]);

export default orderMap;

export const strategyOrder = Array.from(orderMap.keys());
