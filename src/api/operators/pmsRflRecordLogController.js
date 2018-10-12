import request from '@/utils/requestJson'

/**
 * 制卡日志
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listRecord = params => {
    return request.get('/back/rfl/listRecord',{params:params})
}

