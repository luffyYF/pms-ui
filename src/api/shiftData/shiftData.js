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

//查看交班数据详情
export const shiftDataViewByPk = params => {
    return request.get('/back/shiftData/shiftDataViewByPk', {params:params})
} 

// 导出交班数据excel
export const shiftDataViewExcel = params => {
    return request.get('/back/shiftData/shiftDataViewExcel', {params:params})
} 
