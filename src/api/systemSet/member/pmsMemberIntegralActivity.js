import request from '@/utils/requestJson'


/**
* 会员积分活动
* @param params
* @returns {AxiosPromise<any>}
*/
export const listMemberIntegralActivity  = params => {
   return request.get('/memberIntegralActivity/list',{params:params})
}

export const listMember  = params => {
  return request.get('/memberIntegralActivity/getMember',{params:params})
}





export const insertMemberIntegralActivity  = params => {
   return request.post('/memberIntegralActivity/insert', params)
}

export const updateMemberIntegralActivity  = params => {
   return request.post('/memberIntegralActivity/update', params)
}
//
export const deleteMemberIntegralActivity = params => {
   return request.get('/memberIntegralActivity/delete',{params:params})
}
