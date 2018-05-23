import request from '@/utils/requestJson'

/**
 * 日志接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

export const listLog = params => {
    return request.get('/back/log/list',{params:params})
}

export const listBehavior = params => {
    return request.get('/back/log/listBehavior')
}
