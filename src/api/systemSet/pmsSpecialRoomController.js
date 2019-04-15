import request from '@/utils/requestJson'

/**
 * 钟点房、特殊房接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

//查找钟点房规则
export const specialRoomRuleList = params => {
    return request.get('/back/specialRoom/rule/list', {params:params})
}
//主键查找钟点房规则
export const specialRoomRuleFind = params => {
    return request.get('/back/specialRoom/rule/find/'+params)
}
//添加钟点房规则
export const specialRoomRuleAdd = params => {
    return request.post('/back/specialRoom/rule/add', params)
}
//修改钟点房规则
export const specialRoomRuleUpdate = params => {
    return request.post('/back/specialRoom/rule/update', params)
}
//删除钟点房规则
export const specialRoomRuleDel = params => {
    return request.post('/back/specialRoom/rule/del/'+params)
}
//启用禁用钟点房规则
export const specialRoomRuleEnable = params => {
    return request.post('/back/specialRoom/rule/enable',params)
}
//查找选择钟点房规则方案
export const specialRoomRuleschemeList = params => {
    return request.get('/back/specialRoom/rule/schemeList', {params:params})
}
