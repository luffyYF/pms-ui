import request from '@/utils/requestJson'

/**
 * 会员等级接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listGrade = params => {
    return request.get('/back/grade/list')
}

export const addGrade = params => {
    return request.post('/back/grade/add', params)
}

export const updateGrade = params => {
    return request.post('/back/grade/update', params)
}
//
export const delGrade = params => {
    return request.post('/back/grade/del', params)
}


//修改会员卡费用
export const updateGradeCardFee = params => {
    return request.post('/back/grade/cardFee/edit', params)
}
//查找会员卡费的会员级别列表
export const listGradeCardFee = params => {
    return request.get('/back/grade/cardFee/list')
}

