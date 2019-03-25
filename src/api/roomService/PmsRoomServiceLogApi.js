// 房务操作日志表api
// Created by Administrator on 2019-03-23T09:55:14.882.
import request from '@/utils/requestJson'

// 查找数据
export const listApi = params => {
  return request.get('/pmsRoomServiceLog/list', { params: params })
}
// 添加数据
export const addApi = params => {
  return request.post('/pmsRoomServiceLog/add', params)
}
// 修改数据
export const updateApi = params => {
  return request.post('/pmsRoomServiceLog/update', params)
}
// 删除数据
export const deleteApi = params => {
  return request.get('/pmsRoomServiceLog/delete', { params: params })
}
// 详细数据
export const detailApi = params => {
  return request.get('/pmsRoomServiceLog/detail', { params: params })
}
// 房扫查询
export const roomServiceListApi = params => {
  return request.get('/pmsRoomServiceLog/roomServiceList', { params: params })
}