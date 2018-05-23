import request from '@/utils/requestJson'

/**
 * 钟点房、特殊房接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

 //保存钟点房、特殊房
export const roomRuleAdd = params => {
    return request.post('/back/roomRule/add',params);
}

//删除钟点房、特殊房
export const roomRuleDel = params => {
    return request.post('/back/roomRule/del',params);
}
//查找钟点房规制主数据
export const roomRuleHour = () => {
    return request.get('/back/roomRule/hour')
}

 //保存钟点房、特殊房详细价格方案
 export const roomRuleSchemeAdd = params => {
    return request.post('/back/roomRule/scheme/add',params);
}

//删除钟点房、特殊房详细价格方案
export const roomRuleSchemeDel = params => {
    return request.post('/back/roomRule/scheme/del',params);
}

//查找房间规则详细价格方案
export const roomRuleSchemeList = params => {
    return request.get('/back/roomRule/scheme/list',{params:params})
}

//修改钟点房、特殊房详细价格方案
export const roomRuleSchemeUpdate = params => {
    return request.post('/back/roomRule/scheme/update',params);
}

//查找特殊房规制主数据列表
export const roomRuleSpecial = () => {
    return request.get('/back/roomRule/special')
}

//修改钟点房、特殊房
export const roomRuleUpdate = params => {
    return request.post('/back/roomRule/update',params);
}