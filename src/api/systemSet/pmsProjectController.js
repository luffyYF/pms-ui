import request from '@/utils/requestJson'

/**
 * 客房赔偿 / 消费项目 
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listProject = params => {
    return request.get('/back/project/list',{params:params})
}

export const addProject = params => {
    return request.post('/back/project/add', params)
}

export const updateProject = params => {
    return request.post('/back/project/update', params)
}
//
export const delProject = params => {
    return request.post('/back/project/del', params)
}

//查找消费项、结算项
export const listConsumerOrSettlement = params => {
    return request.get('/back/project/listConsumerOrSettlement',{params:params})
}
//修改消费项、结算项
export const updateConsumerOrSettlement = params => {
    return request.post('/back/project/updateConsumerOrSettlement', params)
}
//根据类型查找 目类别： 消费项、结算项
export const listByProjectType = params => {
    return request.get('/back/project/listByProjectType',{params:params})
}
//根据类型查找 目类别： 消费项、结算项
export const listProjects = params => {
    return request.get('/back/project/listProjects',{params:params})
}
//批量更新结算项、消费项
export const batchUpdateConsOrSettl = params => {
    return request.post('/back/project/batchUpdateConsOrSettl', params)
}
