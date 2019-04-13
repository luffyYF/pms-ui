import request from '@/utils/requestJson'

/**
 * 钟点房、特殊房接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

//查找钟点房规则
export const hourRoomRuleList = params => {
    return request.get('/back/hourRoom/rule/list', {params:params})
}
//主键查找钟点房规则
export const hourRoomRuleFind = params => {
    return request.get('/back/hourRoom/rule/find/'+params)
}
//添加钟点房规则
export const hourRoomRuleAdd = params => {
    return request.post('/back/hourRoom/rule/add', params)
}
//修改钟点房规则
export const hourRoomRuleUpdate = params => {
    return request.post('/back/hourRoom/rule/update', params)
}
//删除钟点房规则
export const hourRoomRuleDel = params => {
    return request.post('/back/hourRoom/rule/del/'+params)
}
//启用禁用钟点房规则
export const hourRoomRuleEnable = params => {
    return request.post('/back/hourRoom/rule/enable',params)
}
//查找选择钟点房规则方案
export const hourRoomRuleschemeList = params => {
    return request.get('/back/hourRoom/rule/schemeList', {params:params})
}
