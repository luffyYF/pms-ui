import request from '../utils/requestJson'

/**
 * 获取远期房态数据
 * @param {*} params 
 */
export const getRoomsData = params => {
    return request.get("/search/getRoomsData", params)
}