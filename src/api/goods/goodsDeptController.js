import request from '@/utils/requestJson';
/**
 * 商品部接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品部
export const goodsDeptAdd = params => {
    return request.post('/goods/dept/add',params);
}

// 改变部门对于的商品类型是否使用
export const goodsDeptChangeType = params => {
    return request.post('/goods/dept/change/type',params);
}

// 删除商品部
export const goodsDeptDel = params => {
    return request.post('/goods/dept/del',params);
}

// 查找商品部
export const goodsDeptList = params => {
    return request.get('/goods/dept/list');
}

// 修改商品部
export const goodsDeptUpdate = params => {
    return request.post('/goods/dept/update',params);
}

// 改变部门对商品的信息
export const goodsDeptupdateGoods = params => {
    return request.post('/goods/dept/updateGoods',params);
}