import request from '@/utils/requestJson'

export const updateStatus = params => {
    return request.post('/back/agreementCommission/updateStatus', params)
}

export const updatePrice = params => {
    return request.post('/back/agreementCommission/updatePrice', params)
}

export const listCommission = params => {
    return request.get('/back/agreementCommission/list', {params:params})
}