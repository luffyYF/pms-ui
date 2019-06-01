import request from '@/utils/requestJson'


/**
* 会员积分换房接口
* @param params
* @returns {AxiosPromise<any>}
*/
export const listRule = params => {
   return request.get('/back/integralRoomChangeRule/list',{params:params})
}

export const listGrade = params => {
    return request.get('/back/integralRoomChangeRule/getGradeList',{params:params})
}
//查看会员可用的换房规则
export const listByMemberGrade = params => {
   return request.get('/back/integralRoomChangeRule/listByMemberGrade',{params:params})
}

export const addRule = params => {
   return request.post('/back/integralRoomChangeRule/save', params)
}

export const updateRule = params => {
   return request.post('/back/integralRoomChangeRule/update', params)
}
//
export const delRule = params => {
   return request.post('/back/integralRoomChangeRule/delete/'+params)
}