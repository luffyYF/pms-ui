import request from '@/utils/requestJson'

/**
 * 合约
 */

 //查找客单下拉列表
export const guestSelect = params => {
    return request.get('/back/contract/guestSelect', {params: params})
}
//查找合约列表
 export const listContract = params => {
    return request.get('/back/contract/list', {params: params})
}
//添加合约
export const addContract = params => {
    return request.post('/back/contract/add', params)
}
//取消合约
export const cancelContract = params => {
    return request.post('/back/contract/delete', params)
}
//修改合约
export const modifyContract = params => {
    return request.post('/back/contract/update', params)
}
//查找合约变更记录（价格变更记录）
export const listHistory = params => {
    return request.get('/back/contract/listHistory', {params:params})
}

