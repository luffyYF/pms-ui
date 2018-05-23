import request from '@/utils/requestJson'
/**
 * 房态接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
//添加房间原因 房间状态(维修房、停用房)
export const roomReasonAdd = params => {
    return request.post('/back/room/reason/add',params);
}
//结束房间原因 房间状态(维修房、停用房)
export const roomReasonDel = params => {
    return request.post('/back/room/reason/del',params);
}
//批量:结束房间原因 房间状态(维修房、停用房)
export const roomReasonDelBatch = params => {
    return request.post('/back/room/reason/delBatch',params);
}
// 查找房间原因 房间状态(维修房、停用房)
export const roomReasonList = params => {
    return request.get('/back/room/reason/list',{params:params});
}
//修改房间原因 房间状态(维修房、停用房)
export const roomReasonUpdate = params => {
    return request.post('/back/room/reason/update',params);
}
// 统计房态数据
export const roomStatusCount = params => {
    return request.get('/back/room/status/count');
}
// 查找房态数据
export const roomStatusList = params => {
    return request.get('/back/room/status/list');
}
//修改实时房态
export const roomStatusUpdate = params => {
    return request.post('/back/room/status/update',params);
}
