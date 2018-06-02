import request from '@/utils/requestJson'

/**
 * 哑房账
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listDumbHouse = params => {
   return request.get('/back/dumbHouse/list')
}
export const listByCondition = params => {
   return request.post('/back/dumbHouse/listByCondition',params)
}

export const listByGrid = params => {
    return request.get('/back/dumbHouse/listByGrid', {params:params})
 }

export const addDumbHouse = params => {
   return request.post('/back/dumbHouse/add', params)
}

export const updateDumbHouse = params => {
   return request.post('/back/dumbHouse/update', params)
}

export const delDumbHouse = params => {
   return request.post('/back/dumbHouse/del', params)
}

//获取操作记录
export const listLog = params => {
   return request.get('/back/log/list', {params:params})
}

