import request from '@/utils/requestJson';
/**
 * 商品供应商接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品供应商
export const goodsSupplierAdd = params => {
    return request.post('/goods/supplier/add',params);
}

// 删除商品供应商
export const goodsSupplierDel = params => {
    return request.post('/goods/supplier/del',params);
}

// 查找商品供应商
export const goodsSupplierList = params => {
    return request.get('/goods/supplier/list');
}

// 修改商品供应商
export const goodsSupplierUpdate = params => {
    return request.post('/goods/supplier/update',params);
}