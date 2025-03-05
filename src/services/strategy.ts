import { waitTime } from '#/utils/utils';
import { HttpCode } from '#/utils/contacts';

export async function getAllDept() {
  await waitTime(2000);
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
