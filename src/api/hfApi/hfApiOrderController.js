import request from '@/utils/requestJson'

/**
 * 定时器检测新订单 【废弃】
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const timerCheckNew = params => {
  return request.get('/back/timer/timerCheckNew', {params: params})
}
