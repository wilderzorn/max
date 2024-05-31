const { NODE_ENV } = process.env;
const IS_PRODUCTION = NODE_ENV === 'production';
export const MICRO_CIG = {
  slave: {},
  master: {
    apps: [
      {
        name: 'configure', // 唯一 id
        entry: IS_PRODUCTION ? '/web/child/trconfigure/index.html' : `//localhost:9001`, // 辅助模块独立运行项目
      },
    ],
  },
  sandbox: { strictStyleIsolation: true }, // 开启沙箱,样式隔离
}
