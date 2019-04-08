import request from '@/utils/requestJson'

//退房超时 收费提醒
export const overtimeRemind = params => {
  return request.get('/back/chrRemind/overtimeRemind', {params:params})
}
//提前退房 收费提醒
export const advanceCheckoutRemind = params => {
  return request.get('/back/chrRemind/advanceCheckoutRemind', {params:params})
}
//钟点费 收费提醒
export const hourRoomChargeRemind = params => {
  return request.get('/back/chrRemind/hourRoomChargeRemind', {params:params})
}
