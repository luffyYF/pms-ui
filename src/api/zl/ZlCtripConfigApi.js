// 携程直连配置api
// Created by Administrator on 2019-02-21T16:46:19.175.
import request from '@/utils/requestJson'

// 查找数据
export const listApi = params => {
  return request.get('/zlCtripConfig/list', { params: params })
}
// 添加数据
export const addApi = params => {
  return request.post('/zlCtripConfig/add', params)
}
// 修改数据
export const updateApi = params => {
  return request.post('/zlCtripConfig/update', params)
}
// 删除数据
export const deleteApi = params => {
  return request.get('/zlCtripConfig/delete', { params: params })
}
// 详细数据
export const detailApi = params => {
  return request.get('/zlCtripConfig/detail', { params: params })
}
