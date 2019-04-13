import request from '@/utils/requestJson'

// 添加账套
export const addSetBill = params => {
    return request.post('/back/setBill/add', params)
}

// 保存账套账单
export const addBill = params => {
    return request.post('/back/setBill/addBill', params)
}
// 保存账套账单
export const revokeSetBillStatus = params => {
    return request.post('/back/setBill/revokeSetBillStatus/'+ params)
}



// 编辑账套
export const updateSetBill = params => {
    return request.post('/back/setBill/update', params)
}

// 账套列表 
export const listSetBill = params => {
    return request.get('/back/setBill/list', {params: params})
}

// 协议单位列表
export const listAgreement = params => {
    return request.get('/back/setBill/listAgreement', {params: params})
}