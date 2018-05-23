import request from '@/utils/requestJson'

/**
 * 订单接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
/**
 * 一个时间段内可以安排的房间列表
 */
export const rowRoomListOrder = params => {
    return request.get('/back/order/rowRoom/list')
}
/**
*新增客单
*/
export const addGuestOrder = params => {
    return request.post('/back/order/guest/add', params)
}
//排房
export const rowRoomOrder = params => {
    return request.post('/back/order/rowRoom', params)
}
// 新增预定
export const reserveOrder = params => {
    return request.post('/back/order/reserve', params)
}

// 订单接口
export const continuedRoomOrder = params => {
    return request.post('/back/order/continuedRoom', params)
}
//预定单列表
export const listReserve = params => {
    return request.get('/back/order/list', {params:params})
}
//房态图单个房间保存预定
export const saveCheckin = params => {
    return request.post('/back/order/saveCheckin', params)
}
//查找主订单信息
export const findOrder = params => {
    return request.get('/back/order/findByPk', {params:params})
}
//续房
export const continuedRoom = params => {
    return request.post('/back/order/continuedRoom', params)
}
//换房
export const changeRoom = params => {
    return request.post('/back/order/changeRoom', params)
}
//查找一段时间可以排的房间
export const rowRoomList = params => {
    return request.get('/back/order/rowRoom/list', {params:params})
}
//查找今天预抵的主订单pk
export const findToday = params => {
    return request.get('/back/order/findTodayOrderPk', {params:params})
}
//排房
export const rowRoom = params => {
    return request.post('/back/order/rowRoom', params)
}
//入住
export const checkin = params => {
    return request.post('/back/order/checkin', params)
}
//添加预定（新增客单）
export const addReserveGuest = params => {
    return request.post('/back/order/addReserveGuest', params)
}
//添加客人
export const addGuest = params => {
    return request.post('/back/order/addGuest', params)
}

//查找客单状为预定的客单
export const findReserveGuest = params => {
    return request.get('/back/order/findReserveByPk', {params: params})
}
// 批量取消客单
export const cancelGuestOrder = params => {
    return request.post('/back/order/cancelGuestOrder', params)
}
//更改订单客人信息
export const editOrder = params => {
    return request.post('/back/order/editOrder', params)
}
//更改订单客人信息
export const editOrderMember = params => {
    return request.post('/back/order/editOrderMember', params)
}

//快速预定
export const quickReserve = params => {
    return request.post('/back/order/quickReserve', params)
}

//预定时，动态计算总房费
export const calcMoney = params => {
    return request.get('/back/order/calcMoney', {params: params})
}