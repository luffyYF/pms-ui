import request from '@/utils/requestJson'


/**
* 会员充值赠送规则接口
* @param params
* @returns {AxiosPromise<any>}
*/
export const listRule = params => {
   return request.get('/back/rechargeGiveRule/list',{params:params})
}
export const detailList = params => {
    return request.get('/back/rechargeGiveRule/detailList',{params:params})
}

export const listGrade = params => {
    return request.get('/back/rechargeGiveRule/getGradeList',{params:params})
}

export const addRule = params => {
   return request.post('/back/rechargeGiveRule/save', params)
}

export const updateRule = params => {
   return request.post('/back/rechargeGiveRule/update', params)
}
//
export const delRule = params => {
   return request.post('/back/rechargeGiveRule/delete/'+params)
}