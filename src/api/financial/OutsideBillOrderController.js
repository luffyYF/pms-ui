import request from '@/utils/requestJson';

// 外账单管理
export const list = params => {
  return request.get('/back/outsideBillOrder/list',{params:params});
}
export const listBill = params => {
  return request.get('/back/outsideBillOrder/listBill/'+params);
}
export const add = params => {
  return request.post('/back/outsideBillOrder/add',params);
}
export const settle = params => {
  return request.post('/back/outsideBillOrder/settle',params);
}

