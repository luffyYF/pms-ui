import request from '@/utils/requestJson';
/**
 * 物品管理（外借、留言、寄存）接口
 * @param params
 * @returns {AxiosPromise<any>}
 */
// 保存物品管理(外借、留言、寄存)
export const pmsGoodsAdd = params => {
    return request.post('/back/pmsGoods/add',params);
}
// 取消（外借、寄存、留言）
export const pmsGoodsCancel = params => {
    return request.post('/back/pmsGoods/cancel',params);
}
// 删除物品管理(外借、留言、寄存)
export const pmsGoodsDel = params => {
    return request.post('/back/pmsGoods/del',params);
}

// 归还、领取、读取
export const pmsGoodsEditFinish= params => {
    return request.post('/back/pmsGoods/editFinish',params);
}

// 修改留言
export const pmsGoodsEditNote = params => {
    return request.post('/back/pmsGoods/editNote',params);
}


// 查找物品管理(外借、留言、寄存)
export const pmsGoodsList = params => {
    return request.get('/back/pmsGoods/list',{params:params});
}

// 查找物品管理(外借、留言、寄存)
export const pmsGoodsListCondition = params => {
    return request.get('/back/pmsGoods/listCondition',{params:params});
}

//外借赔偿
export const pmsGoodsPayfor = params => {
    return request.post('/back/pmsGoods/payfor',params);
}
// 修改物品管理(外借、留言、寄存)
export const pmsGoodsUpdate = params => {
    return request.post('/back/pmsGoods/update',params);
}