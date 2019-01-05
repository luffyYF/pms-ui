import request from '@/utils/requestJson'

/**
 * 系统参数配置
 */

//查找参数
export const find = params => {
  return request.get('/back/sysParam/find',{params:params});
}
//更新参数
export const update = params => {
  return request.post('/back/sysParam/update',params);
}