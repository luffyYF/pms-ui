import request from '@/utils/requestJson';
/**
 * 财务稽核
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品仓库
export const billChecking = params => {
  return request.post('/back/financial/billChecking',params);
}