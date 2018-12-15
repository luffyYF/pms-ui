import requestUpms from '../utils/requestJsonUpms'

// 查找数据
export const listApi = params => {
  return requestUpms.get('/backend/invoiceInfo/list', { params: params })
}
// 添加数据
export const addApi = params => {
  return requestUpms.post('/backend/invoiceInfo/add', params)
}
// 修改数据
export const updateApi = params => {
  return requestUpms.post('/backend/invoiceInfo/update', params)
}
// 删除数据
export const deleteApi = params => {
  return requestUpms.get('/backend/invoiceInfo/delete', { params: params })
}

// 详细数据by订单主键
export const detailByOrderPk = params => {
  return requestUpms.get('/backend/invoiceInfo/detailByOrderPk', { params: params })
}

// 详细数据
export const detailApi = params => {
  return requestUpms.get('/backend/invoiceInfo/detail', { params: params })
}
// 查询发票抬头信息
export const getInvoiceTitleApi = params => {
  return requestUpms.get('/backend/invoiceInfo/getInvoiceTitle', { params: params })
}
// 查询发票流程信息
export const getInvoiceStatusFlowApi = params => {
  return requestUpms.get('/backend/invoiceInfo/getInvoiceStatusFlow', { params: params })
}