// 维修记录表api
// Created by Administrator on 2019-03-13T09:43:47.197.
import request from '@/utils/requestJson'

// 查找数据
export const listApi = params => {
  return request.get('/pmsRepairRecord/list', { params: params })
}
// 添加数据
export const addApi = params => {
  return request.post('/pmsRepairRecord/add', params)
}
// 修改数据
export const updateApi = params => {
  return request.post('/pmsRepairRecord/update', params)
}
// 删除数据
export const deleteApi = params => {
  return request.get('/pmsRepairRecord/delete', { params: params })
}
// 详细数据
export const detailApi = params => {
  return request.get('/pmsRepairRecord/detail', { params: params })
}
