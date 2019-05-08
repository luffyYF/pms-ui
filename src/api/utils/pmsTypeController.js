import request from '@/utils/requestJson'
/**
 * 保存类型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const addType = params => {
  return request.post('/back/type/add', params)
}

/**
 * 删除类型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const delType = params => {
  return request.post('/back/type/del', params)
}

/**
 * 修改类型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const updateype = params => {
  return request.post('/back/type/update', params)
}
/**
 * 修改价格编码
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const updateTypeHousePriceCode = params => {
  return request.post('/back/type/updateTypeHousePriceCode', params)
}


/**
 * 查找类型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listType = params => {
  return request.get('/back/type/list', {params: params})
}

/**
 * 查找房型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const roomTypeList = params => {
  return request.get('/back/type/roomTypeList', {params: params})
}

/**
 * 查找公司的所有类型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const allTypeList = params => {
  return request.get('/back/type/allTypeList', {params: params})
}

/**
 * 查找价格方案
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listPriceScheme = params => {
  return request.get('/back/priceScheme/select')
}

/**
 * 保存类型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const addRoomType = params => {
  return request.post('/back/type/addRoomType', params)
}

/**
 * 修改类型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const updateRoomType = params => {
  return request.post('/back/type/updateRoomType', params)
}

/**
 * 查找房型信息
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const roomTypeDetail = params => {
  return request.get('/back/type/detail', {params: params})
}

/**
 * 同步房型价格
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const syncRoomTypePrice = params => {
  return request.post('/back/type/syncRoomTypePrice', params)
}