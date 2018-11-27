import request from '@/utils/requestJson';
/**
 * 财务稽核
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 查找订单对账列表
export const billChecking = params => {
  return request.get('/back/financial/billChecking',{params:params});
}
//查找账单列表
export const billList = params => {
  return request.get('/back/financial/billList',{params:params});
}