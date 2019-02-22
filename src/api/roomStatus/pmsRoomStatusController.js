import request from '@/utils/requestJson'

/**
 * 房态接口
 */

//查找实时房态
export const currentRoomList = params => {
    return request.get('/back/room/status/list', {params:params})
}
//修改实时房态
export const updateRoomStatus = params => {
    return request.post('/back/room/status/update', params)
}
//添加房间原因
export const addRoomReason = params => {
    return request.post('/back/room/reason/add', params)
}
//删除房间原因
export const delRoomReason = params => {
    return request.post('/back/room/reason/del', params)
}
//查找房间原因
export const findRoomReason = params => {
    return request.get('/back/room/reason/find', {params: params})
}
//加载订单信息
export const loadOrderInfo = params => {
    return request.get('/back/room/status/orderInfo', {params: params})
}
//制卡记录
export const saveRflRecord = params => {
    return request.post('/api/rfl/saveRecord', params)
}