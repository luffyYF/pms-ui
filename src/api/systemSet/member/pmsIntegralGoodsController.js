import request from '@/utils/requestJson'

/**
 * 积分商品接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

//保存积分商品
export const integralGoodsAdd = params => {
    return request.post('/back/integralGoods/add',params)
}

//删除积分商品
export const integralGoodsDel = params => {
    return request.post('/back/integralGoods/del',params)
}

//查找积分商品列表
export const integralGoodsList = () => {
    return request.get('/back/integralGoods/list')
}

//保存积分商品
export const integralGoodsUpdate = params => {
    return request.post('/back/integralGoods/update',params)
}