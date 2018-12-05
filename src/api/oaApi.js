import requestOa from '../utils/requestJsonOa'

/**
 * 权限系统库存接口
 */

/**
 * 取消申请
 * @param params
 */
export const cancelApply = params => {
  return requestOa.get('/backend/approval/ex/recall',{params:params})
}
export const listApi = params => {
  return requestOa.get('/backend/sysUser/list',{params:params})
}
export const updateApi = params => {
  return requestOa.post('/backend/sysUser/update', params)
}

/**
 * 排班管理接口
 * @param params
 */
// 查找数据
export const listGroupApi = params => {
  return requestOa.get('/backend/attendanceGroup/list', { params: params })
}