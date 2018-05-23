import request from '@/utils/requestJson'
/**
 * 入住管理
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 入住查询
export const listProject = params => {
    return request.get('/back/check/list', {params: params})
}

// 团队查询
export const teamListProject = params => {
    return request.get('/back/check/list/team', {params: params})
}