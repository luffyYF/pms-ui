import request from '@/utils/requestJson'

/**
 * 商品设置
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品信息
export const addGoodsInfo = params => {   
    return request.post('/goods/info/add', params)
}
// 删除商品信息
export const delGoodsInfo = params => {  
    return request.post('/goods/info/del', params)
} 
// 查找商品信息
export const listGoodsInfo = params => {  
    return request.get('/goods/info/list', {params: params})
}
// 修改商品信息
export const updateGoodsInfo = params => {  
    return request.post('/goods/info/update', params)
}

