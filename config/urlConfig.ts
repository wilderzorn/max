const { CLIENT_ENV } = process.env;

export const SERVER_URL_OBJ = {
  release: 'https://xxxx.xxxx.com', // 线上
  dev: 'https://xxxx.dev.xxxx.com', // dev环境
  pre: 'https://xxxx.pre.xxxx.com', // 预上线环境
  test: 'https://xxxx.test.xxxx.com', // 测试环境
};

const MQTT_URL_OBJ = {
  release: 'wss://xxxx.com:8083', //线上
  dev: 'wss://xxxx:8083', //dev环境
  pre: 'wss://xxx:8083', //预上线环境
  test: 'wss://xxxx:8083', //测试环境
};

const getCurrentMqttUrl = () => {
  // @ts-ignore
  return MQTT_URL_OBJ[CLIENT_ENV] || MQTT_URL_OBJ.release;
};

export const mqttUrl = getCurrentMqttUrl();
