import request from '@/utils/requestJson'

//退房超时收取费用提醒
export const overtimeRemind = params => {
  return request.get('/back/chrRemind/overtimeRemind', {params:params})
}
//提前退房，收取房费提醒
export const advanceCheckoutRemind = params => {
  return request.get('/back/chrRemind/advanceCheckoutRemind', {params:params})
}
