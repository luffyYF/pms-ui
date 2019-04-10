import request from '@/utils/requestJson'

/**
 * 处理协议单位管理
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const addProject = params => {
    return request.post('/back/agreement/add', params)
}

export const delProject = params => {
    return request.post('/back/agreement/del', params)
}

export const updateProject = params => {
    return request.post('/back/agreement/update', params)
}

export const listProject = params => {
    return request.get('/back/agreement/list', {params:params})
}
//查找协议单位名称
export const findUnitName = params => {
    return request.get('/back/agreement/findByPk', {params:params})
}

export const updateProjectCustomerStatus = params => {
    return request.post('/back/agreement/updateCustomerStatus', params)
}

export const updateProjectStatus = params => {
    return request.post('/back/agreement/updateStatus', params)
}
