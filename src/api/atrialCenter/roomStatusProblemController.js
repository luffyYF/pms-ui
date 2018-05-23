import request from '@/utils/requestJson'
/**
 * 问题房态接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 查找问题房态列表
export const listProblem = params => {
    return request.get('/back/room/problem/status/list',{params: params});
}