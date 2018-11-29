import request from '@/utils/requestJson';
/**
 * 财务稽核
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 查找未对账的订单列表
export const billChecking = params => {
  return request.get('/back/financial/billChecking',{params:params});
}
//查找账单列表
export const billList = params => {
  return request.get('/back/financial/billList',{params:params});
}
//确认收账，保存收账记录
export const saveBillChecking = params => {
  return request.post('/back/financial/saveBillChecking',params);
}
//查找收帐记录
export const listBillChecking = params => {
  return request.get('/back/financial/listBillChecking', {params:params});
}
//查找收帐记录详情
export const listBillCheckingDetail = params => {
  return request.get('/back/financial/listBillCheckingDetail', {params:params});
}

//添加账单批注
export const saveBillPostil = params => {
  return request.post('/back/financial/saveBillPostil', params);
}
//查找账单批注记录
export const listBillPostil = params => {
  return request.get('/back/financial/listBillPostil', {params:params});
}
