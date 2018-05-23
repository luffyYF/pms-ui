import request from '@/utils/requestJson';
/**
 * 商品订单接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 查询商品订单列表
export const listGoodsOrder = params => {
    return request.post('/goods/order/list');
}
