import request from '@/utils/requestJson'

//身份证列表
export const list = params => {
  return request.get('/back/orderIdCardInfo/list', {params:params})
}
//保存
export const add = params => {
  return request.post('/back/orderIdCardInfo/add', params)
}
//删除
export const del = params => {
  return request.post('/back/orderIdCardInfo/del/'+params)
}