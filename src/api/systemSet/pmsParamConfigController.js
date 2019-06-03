import request from '@/utils/requestJson'

/**
 * 系统参数配置 新版
 */

/**
 * 查找配置
 * @param {paramType} params DF, YDD, FT, FJ, QT, CW, FW, DY, HY, CK, DH
 */
export const find = params => {
  return request.get('/back/param/config/list',{params:params});
}
//更新参数
export const update = params => {
  return request.post('/back/param/config/update',params);
}
