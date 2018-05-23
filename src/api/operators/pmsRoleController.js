import request from '@/utils/requestJson'

/**
 * 角色接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

export const listRole = params => {
    return request.get('/back/pmsRole/list')
}

export const addRole = params => {
    return request.post('/back/pmsRole/add',params)
}

export const updateRole = params => {
    return request.post('/back/pmsRole/update',params)
}

export const delRole = params => {
    return request.post('/back/pmsRole/del',params)
}
