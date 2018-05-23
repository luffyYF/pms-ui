import request from '@/utils/requestJson';
/**
 * 商品仓库接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品仓库
export const goodsDepotAdd = params => {
    return request.post('/goods/depot/add',params);
}

// 删除商品仓库
export const goodsDepotDel = params => {
    return request.post('/goods/depot/del',params);
}

// 查找商品仓库
export const goodsDepotList = params => {
    return request.get('/goods/depot/list');
}

// 修改商品仓库
export const goodsDepotUpdate = params => {
    return request.post('/goods/depot/update',params);
}