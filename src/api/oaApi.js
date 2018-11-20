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