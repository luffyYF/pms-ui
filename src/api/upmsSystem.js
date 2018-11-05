import request from '../utils/requestJson'

/**
 * 获取地址列表结构数据
 * @returns {V|*}
 */
export const getSystemList = () => {
  return request.get('/sys/system/list')
}

/**
 * 根据主键获取用户对象
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getSystemById = params => {
  return request.get('/sys/system/' + params)
}

export const addSystem = params => {
  return request.post('/sys/system/add', params)
}

export const updateSystem = params => {
  return request.post('/sys/system/update', params)
}

export const delSystem = params => {
  return request.post('/sys/system/del', params)
}

export const listUpmsLog = params => {
  return request.get('/upms/log/list', {params: params})
}

