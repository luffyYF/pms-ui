import request from '../utils/requestJson'

/**
 * 获取地址列表结构数据
 * @returns {V|*}
 */
export const getAdList = () => {
  return request.get('/sys/ad/list')
}

export const getAdById = params => {
  return request.get('/sys/ad/' + params)
}

export const addAd = params => {
  return request.post('/sys/ad/add', params)
}

export const updateAd = params => {
  return request.post('/sys/ad/update', params)
}

export const delAd = params => {
  return request.post('/sys/ad/del', params)
}
