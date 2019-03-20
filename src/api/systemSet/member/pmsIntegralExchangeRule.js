import request from '@/utils/requestJson'


/**
* 会员积分兑换
* @param params
* @returns {AxiosPromise<any>}
*/
export const listRule = params => {
   return request.get('/back/integralExchangeRule/list',{params:params})
}

export const listGrade = params => {
    return request.get('/back/integralExchangeRule/getGradeList',{params:params})
}

export const addRule = params => {
   return request.post('/back/integralExchangeRule/add', params)
}

export const updateRule = params => {
   return request.post('/back/integralExchangeRule/update', params)
}
//
export const delRule = params => {
   return request.post('/back/integralExchangeRule/delete/'+params)
}

export const editEnableFlag = params => {
    return request.post('/back/integralExchangeRule/editEnableFlag', params)
 }