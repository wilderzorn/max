// https://umijs.org/docs/api/config
import { defineConfig } from '@umijs/max';
import routes from './routes';
import webpackPlugin from './webpack.config';
const { NODE_ENV, CLIENT_ENV, TERMINAL_ENV } = process.env;
import { MICRO_CIG } from './micro';
import proxy from './proxy';

const DQ_BASE = '/web/';
const IS_PRODUCTION = NODE_ENV === 'production';

const cig: any = {};

export default defineConfig({
  base: IS_PRODUCTION ? `${DQ_BASE}` : '/', // 在非根目录下部署 umi 项目时，你可以使用 base 配置
  antd: {},
  // XXX 被package.json中type="module" 影响，导致clickToComponent 失效
  // clickToComponent: {}, //  点击组件跳转至编辑器源码位置
  model: {},
  // access 插件依赖 initial State 所以需要同时开启
  access: {},
  initialState: {},
  fastRefresh: true,
  conventionLayout: false, //src/layouts/index.[tsx|vue|jsx|js] 为约定式布局，默认开启
  routes,
  npmClient: 'pnpm',
  outputPath: `/web`, // 打包输出路径。
  publicPath: IS_PRODUCTION ? `${DQ_BASE}` : '/',
  // publicPath: `${DQ_BASE}`,
  hash: true,
  history: {
    type: 'hash',
  },
  mountElementId: 'root-master', // 配置 react 组件树渲染到 HTML 中的元素 id。
  title: false,
  ignoreMomentLocale: true, //忽略 moment 的 locale 文件，用于减少产物尺寸。
  manifest: {
    basePath: '/',
  },
  define: {
    CLIENT_ENV: CLIENT_ENV,
    TERMINAL_ENV: TERMINAL_ENV || 'MAIN',
  },
  inlineLimit: 3000, // 配置图片文件是否走 base64 编译的阈值。默认是 10000 字节，少于他会被编译为 base64 编码，否则会生成单独的文件。
  //设置哪些模块不打包，转而通过 <script> 或其他方式引入，通常需要搭配 headScripts 配置使用。
  ...cig,
  chainWebpack: webpackPlugin,
  request: {},
  dva: {},
  qiankun: MICRO_CIG,
  // 优化构建配置
  mfsu: {
    strategy: 'normal',
  },
  alias: {
    '#': '/src/tool',
    '@': '/src',
  },
  //配置 <head> 中的额外 script。
  headScripts: IS_PRODUCTION
    ? ['window.publicPath = window.resourceBaseUrl || "/web/"']
    : [],
  externals: {},
  proxy,
  styledComponents: {}, // @umijs/max 内置了 styled-components 样式方案。配置开启。
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN', // 默认语言
    antd: true, // 是否启用 Ant Design 的国际化
    baseNavigator: true, // 是否根据浏览器语言自动设置
    title: false,
    baseSeparator: '-',
  },
});
