import request from '@/utils/requestJson';
/**
 * 商品订单详情接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存商品信息
export const listGoodsOrderDetail = params => {
    return request.get('/goods/orderDetail/list',{params:params});
}
// 退单
export const backOrderDetail = params => {
    return request.get('/goods/orderDetail/back',{params:params});
}
