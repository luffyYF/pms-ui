import request from '@/utils/requestJson'

/**
 * 夜审记录接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

export const nightTrialRecordAdd = params => {
    return request.post('/back/nightTrialRecord/add',params)
}

export const nightTrialRecordDel = params => {
    return request.post('/back/nightTrialRecord/del',params)
}

export const nightTrialRecordList = params => {
    return request.get('/back/nightTrialRecord/list',{params:params})
}   