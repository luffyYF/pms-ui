import request from '@/utils/requestJson'

/**
 * 房间类型接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

//保存类型
export const addType = params => {
    return request.post('/back/type/add',params);
}

//删除类型
export const delType = params => {
    return request.post('/back/type/del',params);
}

//查找类型
export const listType = params => {
    return request.get('/back/type/list',{params:params});
}

//修改类型
export const updateType = params => {
    return request.post('/back/type/update',params);
}


/**
 * 渠道
 */
//保存渠道类型
export const addChannelype = params => {
    return request.post('/back/type/channel/add',params);
}

//删除渠道类型
export const delChannelType = params => {
    return request.post('/back/type/channel/del',params);
}

//查找渠道类型
export const listChannelType = params => {
    return request.get('/back/type/channel/list',{params:params});
}

// 查找渠道类型(下拉框)
export const listChannelTypeSelect = params => {
    return request.get('/back/type/channel/select',{params:params});
}

//修改渠道类型
export const updateChannelType = params => {
    return request.post('/back/type/channel/update',params);
}