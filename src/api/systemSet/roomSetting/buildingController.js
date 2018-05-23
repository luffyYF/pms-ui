import request from '@/utils/requestJson'

/**
 * 楼栋接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listBuilding = params => {
    return request.get('/back/building/list')
}

export const addBuilding = params => {
    return request.post('/back/building/add', params)
}

export const updateBuilding = params => {
    return request.post('/back/building/update', params)
}
//
export const delBuilding = params => {
    return request.post('/back/building/del', params)
}
//根据楼栋查找对应的房间
export const listBuildingRoom = params => {
    return request.get('/back/building/room/list', {params:params})
}
//批量房间修改对应的楼栋
export const updateBuildingRoom = params => {
    return request.post('/back/building/room/update', params)
}
