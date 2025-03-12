import { SERVER_URL_OBJ } from './urlConfig';
const { CLIENT_ENV } = process.env;
const serverUrl = function () {
  // @ts-ignore
  return SERVER_URL_OBJ[CLIENT_ENV] || SERVER_URL_OBJ.release;
};
const TR_PROXY = function () {
  return {
    '/api': {
      target: `${serverUrl()}`,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  };
};

export default TR_PROXY();
