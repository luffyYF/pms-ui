import request from '@/utils/requestJson'


/**
* 会员积分规则接口
* @param params
* @returns {AxiosPromise<any>}
*/
export const listRule = params => {
   return request.get('/back/integralRule/list')
}

export const listGrade = params => {
    return request.get('/back/integralRule/getGradeList')
}

export const addRule = params => {
   return request.post('/back/integralRule/save', params)
}

export const updateRule = params => {
   return request.post('/back/integralRule/update', params)
}
//
export const delRule = params => {
   return request.post('/back/integralRule/delete/'+params)
}