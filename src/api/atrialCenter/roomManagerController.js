import request from '@/utils/requestJson'
/**
 * 房间房态管理
 * @param params
 * @returns {AxiosPromise<any>}
 */

//查找房间房态列表
export const listRoom = params => {
    return request.get('/back/roomManager/listRoom',{params:params});
}

//批量置净、置脏
export const updateStatusBatch = params => {
    return request.post('/back/roomManager/updateStatusBatch', params);
}
//批量置停用、维修
export const disableAndRepairBatch = params => {
    return request.post('/back/roomManager/disableAndRepairBatch', params);
}
//批量解除停用、维修
export const delDisableAndRepairBatch = params => {
    return request.post('/back/roomManager/delDisableAndRepairBatch', params);
}
//维修 结束房间原因
export const delRepairRoomReason = params => {
    return request.post('/back/roomManager/delRepairRoomReason', params);
}