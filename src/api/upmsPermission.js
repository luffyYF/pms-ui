import request from '../utils/requestJson'

/**
 * 获取地址列表结构数据
 * @returns {V|*}
 */
export const getPermissionList = () => {
  return request.get('/sys/permission/list')
}

/**
 * 根据主键获取用户对象
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getPermissionById = params => {
  return request.get('/sys/permission/' + params)
}

export const addPermission = params => {
  return request.post('/sys/permission/add', params)
}

export const updatePermission = params => {
  return request.post('/sys/permission/update', params)
}

export const delPermission = params => {
  return request.post('/sys/permission/del', params)
}
