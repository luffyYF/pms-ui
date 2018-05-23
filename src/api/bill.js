import request from '@/utils/requestJson'

//获取项目列表
export const listProject = params => {
  return request.get('/back/project/list?projectMaster=' + params.typeMaster)
}
//账单入账处理
export const addBill = params => {
  return request.post('/back/bill/add', params)
}
//账单授权处理
export const authBill = params => {
  return request.post('/back/bill/auth', params)
}
//查找账单列表
export const listBill = params => {
  // return request.get('/back/bill/list?orderPk=' + params.orderPk+'&dumbPk='+params.dumbPk)
  return request.get('/back/bill/list', {params:params})
}
//账单冲减处理
export const offsetBill = params => { 
  return request.post('/back/bill/offset', params)
}
//账单部分结账处理
export const partialCheckoutBill = params => {
  return request.post('/back/bill/partialCheckout', params)
}
//账单单房结账处理
export const singleRoomCheckoutBill = params => {
  return request.post('/back/bill/singleRoomCheckout', params)
}
//账单拆账处理
export const splitBill = params => {
  return request.post('/back/bill/split', params)
}
//账单转账处理
export const transBill = params => {
  return request.post('/back/bill/trans', params)
}
//查找客单下拉框列表
export const selectGuestOrderBill = params => {
  return request.get('/back/bill/guestOrder/select', {params:params})
}
//统计账单结账余额
export const countCheckoutBill = params => {
  return request.get('/back/bill/checkout/count', {params:params})
}
//结账
export const checkoutauthBill = params => {
  return request.post('/back/bill/checkout', params)
}
//退房未结
export const checkoutNoPay = params => {
  return request.post('/back/bill/checkoutNoPay', params)
}
// 退房未结 豪斯菲尔
export const hfCheckoutNoPay = params => {
  return request.post('/back/bill/hfCheckoutNoPay', params)
}

//部分结账
export const checkoutPart = params => {
  return request.post('/back/bill/checkoutPart', params)
}

