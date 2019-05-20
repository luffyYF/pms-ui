// 图库类型表api
// Created by Administrator on 2019-05-16T10:07:17.754.
import request from '@/utils/requestJson'

// 查找数据
export const listApi = params => {
  return request.get('/backend/moduleImagesType/list', { params: params })
}
// 查找数据(分页)
export const listByPageApi = params => {
  return request.get('/backend/moduleImagesType/listByPage', { params: params })
}
// 添加数据
export const addApi = params => {
  return request.post('/backend/moduleImagesType/add', params)
}
// 修改数据
export const updateApi = params => {
  return request.post('/backend/moduleImagesType/update', params)
}
// 删除数据
export const deleteApi = params => {
  return request.get('/backend/moduleImagesType/delete', { params: params })
}
// 详细数据
export const detailApi = params => {
  return request.get('/backend/moduleImagesType/detail', { params: params })
}
