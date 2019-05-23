import request from '@/utils/requestJson'

export const addApi = params => {
    return request.post('/deviceHotelHardware/add', params)
}

export const updateApi = params => {
    return request.post('/deviceHotelHardware/update', params)
}

export const listApi = params => {
    return request.get('/deviceHotelHardware/list', {params:params})
}

export const allListApi = params => {
    return request.get('/deviceHotelHardware/allList', {params:params})
}

export const deleteApi = params => {
    return request.post('/deviceHotelHardware/delete/'+params)
}