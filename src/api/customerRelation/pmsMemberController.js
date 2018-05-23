import request from '@/utils/requestJson'

/**
 * 处理系统会员设置
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listMember = params => {
   return request.get('/back/member/list', {params: params})
}
export const listMemberCondition = params => {
    return request.get('/back/member/listCondition', {params: params})
}
 
export const addMember = params => {
   return request.post('/back/member/add', params)
}

export const updateMember = params => {
   return request.post('/back/member/update', params)
}

export const delMember = params => {
   return request.post('/back/member/del', params)
}

export const recoverMember = params => {
    return request.post('/back/member/recover', params)
}

export const memberCertificateType = params => {
    return request.get('/back/member/certificate/type')
 }

