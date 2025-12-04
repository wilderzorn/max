import request from '#/utils/request';
import { API } from '@/constants/index';

export async function getFan3dList(params: any) {
  return request(`${API}/api/wt/asset-detail`, {
    method: 'POST',
    data: params,
  });
}
