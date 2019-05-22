// 图库表api
// Created by Administrator on 2019-05-17T16:05:50.128.
import request from '@/utils/requestJson'

// 查找数据
export const listApi = params => {
  return request.get('/backend/moduleImages/list', { params: params })
}
// 查找数据(分页)
export const listByPageApi = params => {
  return request.get('/backend/moduleImages/listByPage', { params: params })
}
// 查找数据(树状图)
export const listTreeApi = params => {
  return request.get('/backend/moduleImages/listTree', { params: params })
}
// 添加数据
export const addApi = params => {
  return request.post('/backend/moduleImages/add', params)
}
// 添加数据(批量)
export const addBatchApi = params => {
  return request.post('/backend/moduleImages/addBatch', params)
}
// 修改数据
export const updateApi = params => {
  return request.post('/backend/moduleImages/update', params)
}
// 删除数据
export const deleteApi = params => {
  return request.get('/backend/moduleImages/delete', { params: params })
}
// 详细数据
export const detailApi = params => {
  return request.get('/backend/moduleImages/detail', { params: params })
}
