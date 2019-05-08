import request from '@/utils/requestJson'

/**
 * 小程序订单接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

//接单
export const takeOrder = params => {
    return request.post('/back/reserveOrder/takeOrder/'+params)
}
//确认取消订单
export const cancelOrder = params => {
    return request.post('/back/reserveOrder/cancelOrder', params)
}
//自定义金额退款
export const orderRefund = params => {
    return request.post('/back/reserveOrder/orderRefund', params)
}
//订单列表
export const listOrder = params => {
    return request.get('/back/reserveOrder/listOrder', {params:params})
}
//更改订单为已入住
export const updateCheckin = params => {
    return request.post('/back/reserveOrder/updateCheckin/'+params)
}
//更改订单为已完成
export const updateFinish = params => {
    return request.post('/back/reserveOrder/updateFinish/'+params)
}
//查找可退款金额
export const getRemainRefundPrice = params => {
    return request.get('/back/reserveOrder/getRemainRefundPrice',{params:params})
}
//查看订单操作记录
export const listOrderLog = params => {
    return request.get('/back/reserveOrder/listOrderLog',{params:params})
}
//查看订单详情
export const orderDetail = params => {
    return request.get('/back/reserveOrder/orderDetail',{params:params})
}



