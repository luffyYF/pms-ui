import request from '@/utils/requestJson'

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
    return request.get('/back/pmsCompany/getMiniApp', params)
}