import request from '@/utils/requestJson'
/**
 * 远期房态接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

 //远期房态列表
export const frowardRoomList = params => {
    return request.get('/back/frowardRoom/list',{params:params});
}

 //远期房态列表
 export const listRoomForWordByRoomPk = params => {
    return request.get('/back/frowardRoom/listRoomForWordByRoomPk',{params:params});
}

// 远期房态详情
export const frowardRoomDetail = params => {
    return request.get('/back/frowardRoom/detail',{params:params});
}

// 获取房型的可预订数量、剩余房间数
export const getBookableCount = params => {
    return request.get('/back/frowardRoom/getBookableCount',{params:params});
}

// 今日可兑换商品查询
export const listMemberIntegralExchange = params => {
  return request.get('/pmsMemberIntegralExchangeLog/listMemberIntegralExchange', { params: params })
}
