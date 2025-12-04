// import '@umijs/max/typings';
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare module '*.jsx';
declare module '*.js';
interface Window {
  emitter: any;
  publicPath: string;
  AMap: any;
}
declare module '*.worker.js' {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}
