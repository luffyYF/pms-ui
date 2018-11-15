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


