import request from '@/utils/requestJson'

/**
 * 定时查看新客单
 */
export const getNewGuestOrder = params => {
  return request.get('/back/timer/getNewGuestOrder', {params:params})
}

export const timeoutHourRoom = params => {
  return request.get('/back/timer/timeoutHourRoom', {params:params})
}