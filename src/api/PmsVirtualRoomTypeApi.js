// pms虚拟房型表api
// Created by Administrator on 2019-05-28T10:43:54.507.
import request from '@/utils/requestJson'

// 查找数据
export const listApi = params => {
  return request.get('/back/pmsVirtualRoomType/list', { params: params })
}
// 添加数据
export const addApi = params => {
  return request.post('/back/pmsVirtualRoomType/add', params)
}
// 修改数据
export const updateApi = params => {
  return request.post('/back/pmsVirtualRoomType/update', params)
}
// 删除数据
export const deleteApi = params => {
  return request.get('/back/pmsVirtualRoomType/delete', { params: params })
}
// 批量删除数据
export const delBatchApi = params => {
  return request.get('/back/pmsVirtualRoomType/delBatch', { params: params })
}
// 详细数据
export const detailApi = params => {
  return request.get('/back/pmsVirtualRoomType/detail', { params: params })
}
