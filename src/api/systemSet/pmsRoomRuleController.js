import request from '@/utils/requestJson'

/**
 * 钟点房、特殊房接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

//查找钟点房规制主数据
export const roomRuleHour = () => {
    return request.get('/back/roomRule/hour')
}

//修改钟点房、特殊房
export const roomRuleUpdate = params => {
    return request.post('/back/roomRule/update',params);
}

//查找钟点房价格方案
export const roomRuleSchemeList = params => {
    return request.get('/back/roomRule/scheme/list',{params:params})
}

 //添加钟点房价格方案
 export const roomRuleSchemeAdd = params => {
    return request.post('/back/roomRule/scheme/add',params);
}

//删除钟点房价格方案
export const roomRuleSchemeDel = params => {
    return request.post('/back/roomRule/scheme/del',params);
}

//修改钟点房价格方案
export const roomRuleSchemeUpdate = params => {
    return request.post('/back/roomRule/scheme/update',params);
}


