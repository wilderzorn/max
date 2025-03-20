// 运行时配置
import request from '#/constants/defineRequest';
import { defineApp, history, useModel } from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '@umijs/max' };
}

// 在初始加载和路由切换时做一些事情，比如用于做埋点统计
export const onRouteChange = ({ location }: any) => {
  // back top
  if (location.pathname !== window.location.pathname) {
    const el = document.scrollingElement || document.documentElement;
    if (el.scrollTop !== 0) {
      el.scrollTop = 0;
    }
  }
};

/**
 * 微前端：主应用为子应用添加props state
 * @returns
 */

export function useQiankunStateForSlave() {
  const { setGlobal, global } = useModel('global');
  // 子应用：使用mount生命周期中props提供的内容
  /**
   * return的内容会添加给子应用mount生命周期中props中
   */
  return {
    // 给子应用的初始值
    globalState: global,
    // 给子应用的修改值方法.
    // PS：子应用直接调用setGlobal是不生效的，所以才需要这个额外的方法，这是一个坑
    saveGlobalState: (state: any) => {
      setGlobal(state);
    },
    // 子应用通过主应用跳转
    toMasterLink: (path: string) => {
      history.push(path);
      setGlobal({ pathname: path });
    },
  };
}

export default defineApp({
  request: request, // umi内置request配置
  onRouteChange: onRouteChange,
});
