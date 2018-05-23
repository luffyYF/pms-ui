import request from '@/utils/requestJson'
/**
 * 处理协议单位管理
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存协议单位房间价格
export const addPriceProject = params => {
    return request.post('/back/agreement/price/add', params)
}

// 删除协议单位房间价格
export const delPriceProject = params => {
    return request.post('/back/agreement/price/del', params)
}

// 查询协议单位房间价格 
export const listPriceProject = params => {
    return request.get('/back/agreement/price/list', {params: params})
}