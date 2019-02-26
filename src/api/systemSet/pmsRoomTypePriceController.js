import request from '@/utils/requestJson'

 //初始化设置价格
export const initPrice = params => {
  return request.post('/back/roomTypePrice/initPrice',params);
}
//获取初始化截止日期
export const getInitEndDate = params => {
  return request.get('/back/roomTypePrice/getInitEndDate',{params: params});
}
//获取日历控件数据
export const calendarPrice = params => {
  return request.get('/back/roomTypePrice/calendarPrice',{params: params});
}
//修改每天价格
export const editPrice = params => {
  return request.post('/back/roomTypePrice/editPrice',params);
}
//获取直连房态设置数据
export const getRoomStatusSetting = params => {
  return request.get('/back/roomTypePrice/getRoomStatusSetting',{params: params});
}
//修改每天房态，房量
export const settingRoomStatus = params => {
  return request.post('/back/roomTypePrice/settingRoomStatus',params);
}
//修改每天房价
export const settingPrice = params => {
  return request.post('/back/roomTypePrice/settingPrice',params);
}