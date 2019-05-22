// api
// Created by Administrator on 2019-05-18T11:08:16.382.
import request from '@/utils/requestJson'

// 查找数据
export const listApi = params => {
  return request.get('/deviceRoomLockParam/list', { params: params })
}
// 添加数据
export const addApi = params => {
  return request.post('/deviceRoomLockParam/add', params)
}
// 修改数据
export const updateApi = params => {
  return request.post('/deviceRoomLockParam/update', params)
}
// 删除数据
export const deleteApi = params => {
  return request.get('/deviceRoomLockParam/delete', { params: params })
}
// 详细数据
export const detailApi = params => {
  return request.get('/deviceRoomLockParam/detail', { params: params })
}

// 批量修改数据
export const batchUpdateRoomLockParam = params => {
  return request.post('/deviceRoomLockParam/batchUpdateRoomLockParam', params)
}
