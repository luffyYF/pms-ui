import request from '@/utils/requestJson'

/**
 * 班次接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listShift = params => {
  return request.get('/back/shift/list')
}

export const addShift = params => {
  return request.post('/back/shift/add', params)
}

export const updateShift = params => {
  return request.post('/back/shift/update', params)
}
//
export const delShift = params => {
  return request.post('/back/shift/del', params)
}
//查找班次选择框
export const selectShift = params => {
  return request.get('/back/shift/select')
}