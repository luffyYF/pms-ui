import request from '@/utils/requestJson'

/**
 * 处理系统会员设置
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listMember = params => {
   return request.get('/back/member/list', {params: params})
}

//查询会员列表信息
export const listMemberById = params => {
  return request.get('/back/member/memberList', {params: params})
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

 export const giveRule = params => {
    return request.get('/back/member/giveRule', {params: params})
 }

 export const recharge = params => {
    return request.post('/back/member/recharge', params)
 }
 //修改会员卡号
 export const updateMemberCard = params => {
   return request.post('/back/member/updateMemberCard', params)
}

