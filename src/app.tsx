// 运行时配置
import { defineApp, history, useModel } from '@umijs/max';
import { message } from 'antd';
import { getAuthorization, setAuthorization } from '#/utils/authority';

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

export const request = {
  // 超时时间
  timeout: 1000 * 10,
  baseURL: '/api',
  // 请求头
  // headers: { 'X-Requested-With': 'XMLHttpRequest' },
  errorConfig: {
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } = res;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    errorHandler: (error: any) => {
      // eslint-disable-next-line no-console
      console.log('error', error);
      // TODO：配置后端接口的code
      if (error.response.data?.code) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        switch (error.response.data.code) {
          case 200: {
            return;
          }
          case 401: {
            setAuthorization();
            if (location.pathname !== 'login') {
              history.replace('/login');
              message.error('请先登录');
            }
            return;
          }
          default: {
            message.error(error.response.data?.data);
            return;
          }
        }
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        message.error('服务器错误，请稍后重试！');
      } else {
        // 发送请求时出了点问题
        message.error('请求错误，请重试！');
      }
    },
  },
  // 拦截器
  requestInterceptors: [
    (url: any, options: any): any => {
      // 拦截请求配置，进行个性化处理。
      if (url === '/api/user/userLogin') {
        localStorage.clear();
      }
      const token = getAuthorization();

      return {
        url,
        options: {
          ...options,
          // 设置请求头
          headers: {
            'Content-Type': 'application/json',
            Logintoken: token,
            ...(options.headers ?? {}),
          },
        },
      };
    },
  ],
  responseInterceptors: [
    (res: any) => {
      return res;
    },
  ],
};

export default defineApp({
  request: request, // umi内置request配置
  onRouteChange: onRouteChange,
});
