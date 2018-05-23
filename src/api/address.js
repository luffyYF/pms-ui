import request from '../utils/requestJson'

/**
 * 获取地址树状结构数据
 * @returns {V|*}
 */
export const getAddressTree = () => {
  return request.get(`sys/address/tree`)
}
/**
 * 获取地址列表结构数据
 * @returns {V|*}
 */
export const getAddressList = () => {
  return request.get(`/sys/address/list`)
}

export const addAddress = params => {
  return request.post(`/sys/address/add`, params)
}

export const updateAddress = params => {
  return request.post(`/sys/address/update`, params)
}

export const delAddress = params => {
  return request.post(`/sys/address/del`, params)
}
