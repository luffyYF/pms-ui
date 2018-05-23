import request from '@/utils/requestJson'

/**
 * 会员充值优惠管理接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listRecharge = params => {
    return request.get('/back/recharge/list')
}

export const addRecharge = params => {
    return request.post('/back/recharge/add', params)
}

export const updateRecharge = params => {
    return request.post('/back/recharge/update', params)
}

export const delRecharge = params => {
    return request.post('/back/recharge/del', params)
}