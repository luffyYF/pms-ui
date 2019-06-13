import request from '@/utils/requestJson'
import wechatRequest from '@/utils/requestJsonWechat'

/**
 * 酒店接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

export const getCompanyInfot = () => {
    return request.get('/back/pmsCompany/getCompanyInfo')
}

export const updateCompany = params => {
    return request.post('/back/pmsCompany/update', params)
}

export const getMiniApp = params => {
    return wechatRequest.get('/back/wechatApply/getWechatApplyByStatus', {params : params})
}