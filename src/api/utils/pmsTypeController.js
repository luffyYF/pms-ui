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
 * 查找类型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listType = params => {
  return request.get('/back/type/list', {params: params})
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
