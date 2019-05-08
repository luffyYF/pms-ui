import request from '@/utils/requestJson'

//获取项目列表
export const listProject = params => {
  return request.get('/back/project/list?projectMaster=' + params.typeMaster)
}

//账单入账处理
export const addBill = params => {
  return request.post('/back/bill/add', params)
}

//账单批量入账处理
export const addBills = params => {
  return request.post('/back/bill/adds', params)
}
//哑房账单入账处理
export const addDumbBill = params => {
  return request.post('/back/bill/addDumbBill', params)
}
//哑房账单批量入账处理
export const addDumbBills = params => {
  return request.post('/back/bill/addDumbBills', params)
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
// export const transBill = params => {
//   return request.post('/back/bill/trans', params)
// }

//账单转账处理
export const transferAccountsBill = params => {
  return request.post('/back/bill/transferAccounts', params)
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

// 查找房间的结账记录
export const findBillEndRecordOfRoom = params => {
  return request.get('/back/bill/endRecord/findBillEndRecordOfRoom', {params:params})
}

// 结账恢复
export const recoverBillEndRecord = params => {
  return request.post('/back/bill/endRecord/recoverBillEndRecord', params)
}

//客单单房退房
export const checkoutGuest = params => {
  return request.post('/back/bill/checkoutGuest/'+params)
}

// 查找押金
export const findDepositFromBills = params => {
  return request.get('/back/bill/findDepositFromBills', {params:params})
}


//协议单位/中介账务 begin


// 根据协议单位查找消费项账单
export const listBillByAgreement = params => {
  return request.get('/back/bill/listBillByAgreement', {params:params})
}
// 根据账套查找账单
export const listBillBySetBillPk = params => {
  return request.get('/back/bill/listBillBySetBillPk', {params:params})
}
// 根据协议单位查找结算项账单
export const listSettleBillByAgreement = params => {
  return request.get('/back/bill/listSettleBillByAgreement', {params:params})
}
// 根据协议单位查找账套
export const listSetBillByAgreementPk = params => {
  return request.get('/back/bill/listSetBillByAgreementPk', {params:params})
}
// 根据账单结账
export const unitSettleAccounts = params => {
  return request.post('/back/bill/unitSettleAccounts', params)
}
// 查询单位/中介,账务/收款
export const agreementBillQuery = params => {
  return request.get('/back/bill/agreementBillQuery', {params:params})
}

//协议单位/中介账务 end

/************* 会员账单begin *************/
/**
 * 查询会员消费账单
 */
export const findMemberConsumptionBills = params => {
  return request.get('/back/bill/findMemberConsumptionBills', {params:params})
}