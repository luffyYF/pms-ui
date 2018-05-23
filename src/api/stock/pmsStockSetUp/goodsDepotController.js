import request from '@/utils/requestJson'

/**
 * 商品仓库
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品仓库
export const addGoodsDepot = params => { 
    return request.post('/goods/depot/add', params)
}
// 删除商品仓库
export const delGoodsDepot = params => {
    return request.post('/goods/depot/del', params)
} 
// 查找商品仓库
export const listGoodsDepot = params => {
    return request.get('/goods/depot/list', params)
} 
// 修改商品仓库
export const updateGoodsDepot = params => {
    return request.post('/goods/depot/update', params)
} 