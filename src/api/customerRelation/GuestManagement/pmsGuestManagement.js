import request from '@/utils/requestJson'

/**
 * 客人管理
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 查找在住客人信息
export const liveInProject = params => {
    return request.get('/back/guest/liveIn', {params: params})
}
// 查找历史客人信息
export const historyLiveInProject = params => {
    return request.get('/back/guest/historyLiveIn', {params: params})
}

