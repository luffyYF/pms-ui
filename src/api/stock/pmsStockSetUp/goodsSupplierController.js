import request from '@/utils/requestJson'

/**
 * 供应商
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品供应商
export const addGoodsSupplier = params => {   
    return request.post('/goods/supplier/add', params)
}
// 删除商品供应商
export const delGoodsSupplier = params => {   
    return request.post('/goods/supplier/del', params)
}
// 查找商品供应商
export const listGoodsSupplier = params => {   
    return request.get('/goods/supplier/list', {params: params})
}
// 修改商品供应商
export const updateGoodsSupplier = params => {   
    return request.post('/goods/supplier/update', params)
}
