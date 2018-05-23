import request from '../utils/requestJson'

/**
 * 获取地址列表结构数据
 * @returns {V|*}
 */
export const getRoleList = () => {
  return request.get('/sys/role/list')
}

/**
 * 根据主键获取用户对象
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getRoleById = params => {
  return request.get('/sys/role/' + params)
}

export const addRole = params => {
  return request.post('/sys/role/add', params)
}

export const updateRole = params => {
  return request.post('/sys/role/update', params)
}

export const delRole = params => {
  return request.post('/sys/role/del', params)
}
