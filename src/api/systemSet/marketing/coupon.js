import request from '@/utils/requestJson'

/**
 * 优惠券接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

/**
 * 优惠券列表
 */
export const listCoupon  = params =>  {
    return request.get('/back/coupon/list',{params:params})
}

/**
 * 优惠券列表
 */
export const couponList  = params =>  {
    return request.get('/back/coupon/listCoupon',{params:params})
}

//添加优惠券
export const addCoupon = params => {
    return request.post('/back/coupon/add',params)
}
//修改优惠券
export const updateCoupon = params => {
    return request.post('/back/coupon/update',params)
}

//删除优惠券
export const deleteCoupon = params => {
    return request.post('/back/coupon/delete/'+params)
}
//删除优惠券
export const editEnableFlag = params => {
    return request.post('/back/coupon/editEnableFlag',params)
}