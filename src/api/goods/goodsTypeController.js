import request from '@/utils/requestJson'
/**
 * 商品类型接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品类型
export const goodsTypeAdd = params => {
    return request.post('/goods/type/add',params);
}

// 删除商品类型
export const goodsTypeDel = params => {
    return request.post('/goods/type/del',params);
}

// 查找商品类型
export const goodsTypeList = params => {
    return request.get('/goods/type/list');
}

// 加载上架并且存在上架商品的商品类型
export const getUpGoodsTypeList = params => {
    return request.get('/goods/type/listUpGoodsType');
}

// 查找商品类型树形结构
export const goodsTypeTree = params => {
    return request.get('/goods/type/tree');
}

// 修改商品类型
export const goodsTypeUpdate = params => {
    return request.post('/goods/type/update',params);
}

// 根据商品部主键、商品类型主键、是否上架查询商品列表 
export const listUpGoodsInfo = params => {
    return request.get('/goods/type/listUpGoodsInfo',{params: params});
}