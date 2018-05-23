import request from '../utils/requestJson'

/**
 * 获取团队运动列表
 * @param params
 * @returns {Promise.<TResult>}
 */
export const getTeamMap = params => {
  return request.get('/sso/getTeamMap', params)
}


