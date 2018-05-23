import request from '../utils/requestJson'

/**
 * 统计首页数据
 */
export const getIndexStatistics = () => {
  return request.get('/index/statistics')
}
