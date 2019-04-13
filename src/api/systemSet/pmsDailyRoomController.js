import request from '@/utils/requestJson'

/**
 * 钟点房、特殊房接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

//查找钟点房规则
export const dailyRoomRuleList = params => {
    return request.get('/back/dailyRoom/rule/list', {params:params})
}
//主键查找钟点房规则
export const dailyRoomRuleFind = params => {
    return request.get('/back/dailyRoom/rule/find/'+params)
}
//添加钟点房规则
export const dailyRoomRuleAdd = params => {
    return request.post('/back/dailyRoom/rule/add', params)
}
//修改钟点房规则
export const dailyRoomRuleUpdate = params => {
    return request.post('/back/dailyRoom/rule/update', params)
}
//删除钟点房规则
export const dailyRoomRuleDel = params => {
    return request.post('/back/dailyRoom/rule/del/'+params)
}
//启用禁用钟点房规则
export const dailyRoomRuleEnable = params => {
    return request.post('/back/dailyRoom/rule/enable',params)
}
