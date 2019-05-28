import request from '@/utils/requestJson'

// 预览
export const getPreShiftInf = params => {
    return request.get('/back/shiftData/getPreShiftInf', {params:params})
} 

// 添加
export const addShiftData = params => {
    return request.post('/back/shiftData/addShiftData', params)
} 

// 查找
export const listShiftData = params => {
    return request.get('/back/shiftData/listShiftData', {params:params})
} 

// 查找
export const shiftDataView = params => {
    return request.get('/back/shiftData/shiftDataView', {params:params})
} 

