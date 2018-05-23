import request from '@/utils/requestJson';
/**
 * 物品管理(外借、留言、寄存)
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 查找客单下拉列表
export const guestSelect = params => {
    return request.get('/back/pmsGoods/guestSelect',{params:params});
}
//保存物品管理
export const addGM = params => {
    return request.post('/back/pmsGoods/add',params);
}
//查找物品管理(外借、留言、寄存) 多条件查询
export const listCondition = params => {
    return request.get('/back/pmsGoods/listCondition',{params:params});
}
//归还、领取、读取
export const editFinish = params => {
    return request.post('/back/pmsGoods/editFinish',params);
}
//取消（外借、寄存、留言）
export const cancelGM = params => {
    return request.post('/back/pmsGoods/cancel',params);
}
//外借赔偿
export const payfor = params => {
    return request.post('/back/pmsGoods/payfor',params);
}
//修改留言
export const editNote = params => {
    return request.post('/back/pmsGoods/editNote',params);
}
//查找外借、寄存、留言数量 （按钮数量显示）
export const gmCount = params => {
    return request.get('/back/pmsGoods/gmCount',{params: params});
}
