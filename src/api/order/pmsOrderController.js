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
// 新增积分换房预定
export const saveRoomChangeReserve = params => {
    return request.post('/back/order/saveRoomChangeReserve', params)
}
//团队预定
export const teamReserve = params => {
    return request.post('/back/order/teamReserve', params)
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
//查找客单列表信息
export const listGuest = params => {
    return request.get('/back/order/listGuest', {params:params})
}
//续房
export const continuedRoom = params => {
    return request.post('/back/order/continuedRoom', params)
}
//批量续房
export const continuedRoomBatch = params => {
    return request.post('/back/order/continuedRoomBatch', params)
}
//换房
export const changeRoom = params => {
    return request.post('/back/order/changeRoom', params)
}
//查找一段时间可以排的房间
export const rowRoomList = params => {
    return request.get('/back/order/rowRoom/list', {params:params})
}
//查找一段时间可以入住的房间
export const getCheckinAbleRoom = params => {
    return request.get('/back/order/getCheckinAbleRoom', {params:params})
}
//查找今天预抵的主订单pk
// export const findToday = params => {
//     return request.get('/back/order/findTodayOrderPk', {params:params})
// }
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
//设置二维码开门手机号
export const qrCodePhoneSetting = params => {
    return request.post('/back/order/qrCodePhoneSetting', params)
}

//快速预定
export const quickReserve = params => {
    return request.post('/back/order/quickReserve', params)
}

//预定时，动态计算总房费
export const calcMoney = params => {
    return request.get('/back/roomTypePrice/calcMoney', {params: params})
}
//预定时，动态计算总房费
export const listLog = params => {
    return request.get('/back/order/listLog', {params: params})
}
//根据主单号查询订单
export const getPmsOrderByNo = params => {
    return request.get('/back/order/getPmsOrderByNo', {params:params})
}
//批量排房
export const rowRoomBatch = params => {
    return request.post('/back/order/rowRoomBatch', params)
}
//查找客单简单信息
export const listSimpleGuestMemberInfo = params => {
    return request.get('/back/order/listSimpleGuestMemberInfo', {params:params})
}
//批量修改客单简单信息
export const editOrderMemberBatch = params => {
    return request.post('/back/order/editOrderMemberBatch', params)
}
//恢复退房客单
export const recoverCheckoutGuestOrder = params => {
    return request.post('/back/order/recoverCheckoutGuestOrder/'+params)
}
//恢复取消预定的客单
export const recoverReserveGuestOrder = params => {
    return request.post('/back/order/recoverReserveGuestOrder/'+params)
}
//添加入住
export const addCheckin = params => {
    return request.post('/back/order/addCheckin', params)
}
//批量添加入住
export const batchAddCheckin = params => {
    return request.post('/back/order/batchAddCheckin', params)
}
//查找空房列表
export const listEmptyRoom = params => {
    return request.get('/back/order/listEmptyRoom', {params: params})
}

//批量更改预订单抵店离店日期
export const updateReserveDateBatch = params => {
    return request.post('/back/order/updateReserveDateBatch', params)
}
//批量更改预订单的房型
export const updateReserveRoomTypeBatch = params => {
    return request.post('/back/order/updateReserveRoomTypeBatch', params)
}
//查询近三天内的在住或离店客人
export const guestListApi = params => {
    return request.get('/back/order/findThreeDaysGuest', {params: params})
}

//钟点房转换为全日房
export const convertToDailyRoom = params => {
    return request.post('/back/order/convertToDailyRoom/'+ params)
}

//联房客单列表
export const linkListGuest = params => {
    return request.get('/back/order/link/listGuest', {params:params})
}

//选择联房 联房模块中组单房间选择
export const linkListGroup = params => {
    return request.get('/back/order/link/listGroup', {params:params})
}

//加入联房
export const linkJoin = params => {
    return request.post('/back/order/link/join', params)
}

//退出联房
export const outJoin = params => {
    return request.post('/back/order/link/outJoin', params)
}