import requestUpms from '../utils/requestJsonUpms'

/**
 * 权限系统库存接口
 */

/**
 * 查找仓库列表
 * @param params
 */
export const getStorageList = params => {
  return requestUpms.get('/backend/storage/list',{params:params})
}

/**
 * 添加仓库
 * @param params
 */
export const addStorage = params => {
  return requestUpms.post('/backend/storage/add',params)
}

/**
 * 修改仓库
 * @param params
 */
export const updateStorage = params => {
  return requestUpms.post('/backend/storage/update',params)
}

/**
 * 删除仓库
 * @param params
 */
export const deleteStorage = params => {
  return requestUpms.get('/backend/storage/delete',{params:params})
}

/**
 * 查找货物类型级联列表
 * @param params
 */
export const typeCascaderList = params => {
  return requestUpms.get('/backend/ckInventoryType/cascaderList',{params:params})
}

/**
 * 查找库存列表
 * @param params
 */
export const stockList = params => {
  return requestUpms.get('/backend/ckStock/list',{params:params})
}

/**
 * 获取申领序列
 * @param params
 */
export const getApplySequence = params => {
  return requestUpms.get('/seq/applySequence',{params:params})
}
/**
 * 获取入库序列
 * @param params
 */
export const getInSequence = params => {
  return requestUpms.get('/seq/inSequence',{params:params})
}
/**
 * 获取盘库序列
 * @param params
 */
export const getPkSequence = params => {
  return requestUpms.get('/seq/pkSequence',{params:params})
}

/**
 * 发起申领
 * @param params
 */
export const toApply = params => {
  return requestUpms.post('/backend/ckApplyForm/toApply', params)
}
/**
 * 查找神申领列表
 */
export const applyList = params => {
  return requestUpms.get('/backend/ckApplyForm/list', {params:params})
}
/**
 * 查找神申领详细列表
 */
export const applyDetailList = params => {
  return requestUpms.get('/backend/ckApplyForm/detailList', {params:params})
}

/**
 * 查找货物下拉列表
 * @param params
 */
export const inventorySelectList = params => {
  return requestUpms.get('/backend/ckInventory/selectList',{params:params})
}

/**
 * 查找出货信息
 * @param params
 */
export const outInventoryInfo = params => {
  return requestUpms.get('/backend/ckApplyForm/outInventoryInfo',{params:params})
}

/**
 * 查看出货信息和详细
 * @param params
 */
export const inventoryOutInfo = params => {
  return requestUpms.get('/backend/ckApplyForm/inventoryOutInfo',{params:params})
}

/**
 * 确认收货
 * @param params
 */
export const outConfirm = params => {
  return requestUpms.get('/backend/ckApplyForm/outConfirm/'+params)
}

/**
 * 查找出库详细信息
 * @param params
 */
export const findOutInfo = params => {
  return requestUpms.get('/backend/ckInventoryIn/outInfo',{params:params})
}

/**
 * 入库操作
 * @param params
 */
export const inventoryIn = params => {
  return requestUpms.post('/backend/ckInventoryIn/inventoryIn', params)
}

/*
库存盘点
*/
// 预览盘点数据
export const viewTakeStockDetail = params => {
  return requestUpms.get('/backend/ckTakeStock/viewTakeStockDetail', { params: params })
}
// 添加数据盘点单
export const saveTakeStock = params => {
  return requestUpms.post('/backend/ckTakeStock/saveTakeStock', params)
}
// 取消盘点单
export const cancelOrCompleteTakeStock = params => {
  return requestUpms.post('/backend/ckTakeStock/cancelOrCompleteTakeStock',params)
}
// 查看盘点记录列表
export const getTakeStockList = params => {
  return requestUpms.get('/backend/ckTakeStock/getTakeStockList', { params: params })
}
//根据盘点id 查询盘点详情
export const getTakeStockDetail = params => {
  return requestUpms.get('/backend/ckTakeStock/getTakeStockDetail', { params: params })
}