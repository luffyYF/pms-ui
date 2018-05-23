import request from '@/utils/requestJson'

/**
 * 查找类型
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const idcard = params => {
  return request.get('/idcard', {params: params})
}
