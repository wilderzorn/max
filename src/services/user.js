import request from '#/utils/request';
// 登陆接口
export async function onLogin(data) {
  return await new Promise(async (resolve) => {
    setTimeout(() => {
      return resolve({
        statusCode: '1000',
        token: new Date().getTime(),
      });
    }, 3000);
  });
  // return await request(`/xxxxxxxxx`, {
  //   method: 'POST',
  //   data,
  // });
}
