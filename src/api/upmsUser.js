import request from '../utils/requestJson'

/**
 * 获取地址列表结构数据
 * @returns {V|*}
 */
export const getUserList = () => {
  return request.get('/sys/user/list')
}

export const getUserById = params => {
  return request.get('/sys/user/' + params)
}

export const addUser = params => {
  return request.post('/sys/user/add', params)
}

export const updateUser = params => {
  return request.post('/sys/user/update', params)
}

export const delUser = params => {
  return request.post('/sys/user/del', params)
}
