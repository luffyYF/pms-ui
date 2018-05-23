import request from '@/utils/requestJson'

/**
 * 租赁物品接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listRentalItems = params => {
    return request.get('/back/items/list')
}

export const addRentalItems = params => {
    return request.post('/back/items/add', params)
}

export const updateRentalItems = params => {
    return request.post('/back/items/update', params)
}
//
export const delRentalItems = params => {
    return request.post('/back/items/del', params)
}