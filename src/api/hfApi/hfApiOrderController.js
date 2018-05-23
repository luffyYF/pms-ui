import request from '@/utils/requestJson'

/**
 * 定时器检测新订单
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const timerCheckNew = params => {
  return request.get('/api/hf/timerCheckNew', {params: params})
}
