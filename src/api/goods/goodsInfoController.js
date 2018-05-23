import request from '@/utils/requestJson';
/**
 * 商品信息接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品信息
export const goodsInfoAdd = params => {
    return request.post('/goods/info/add',params);
}

// 删除商品信息
export const goodsInfoDel = params => {
    return request.post('/goods/info/del',params);
}

// 查找商品信息
export const goodsInfoList = params => {
    return request.get('/goods/info/list');
}

// 根据商品部主键、商品类型主键、状态查找商品列表
export const goodsInfolistGoodsInfoByStatus = params => {
    return request.get('/goods/info/listGoodsInfoByStatus', {params: params});
}


// 修改商品信息
export const goodsInfoUpdate = params => {
    return request.post('/goods/info/update',params);
}