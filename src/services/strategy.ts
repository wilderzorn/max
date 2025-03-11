import timeout from '#/utils/timeout';
import { HttpCode } from '#/utils/contacts';

export async function getAllDept() {
  await timeout(2000);
  return {
    statusCode: HttpCode.SUCCESS,
    data: [
      {
        label: '大山台风电场',
        value: '01001001',
      },
      {
        label: '王庙瑞风风电场',
        value: '01003080',
      },
    ],
  };
}
