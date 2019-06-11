// api
// Created by Administrator on 2019-05-31T09:07:19.655.
import request from '@/utils/requestJson';

// 查找数据
export const listApi = params => {
  return request.get('/pmsMemberIntegralExchange/list', { params: params })
}
// 添加数据
export const addApi = params => {
  return request.post('/pmsMemberIntegralExchange/add', params)
}
// 修改数据
export const updateApi = params => {
  return request.post('/pmsMemberIntegralExchange/update', params)
}
// 删除数据
export const deleteApi = params => {
  return request.get('/pmsMemberIntegralExchange/delete', { params: params })
}
// 详细数据
export const detailApi = params => {
  return request.get('/pmsMemberIntegralExchange/detail', { params: params })
}

// 今日可兑换商品查询
export const listMemberIntegralExchange = params => {
  return request.get('/pmsMemberIntegralExchange/listMemberIntegralExchange', { params: params })
}
