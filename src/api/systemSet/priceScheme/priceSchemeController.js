import request from '@/utils/requestJson'

/**
 * 价格方案接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

export const addPriceScheme = params => {
    return request.post('/back/priceScheme/add', params);
}

export const delPriceScheme = params => {
    return request.post('/back/priceScheme/del',params);
}

export const listPriceScheme = params => {
    return request.get('/back/priceScheme/list',{params:params});
}

export const selectPriceScheme = params => {
    return request.get('/back/priceScheme/select');
}

export const updatePriceScheme = params => {
    return request.post('/back/priceScheme/update',params);
}

export const updateUsingPriceScheme = params => {
    return request.post('/back/priceScheme/update/using',params);
}
// 查找价格方案的价格
export const findPriceSchemeDetailPrice = params => {
    return request.get('/back/priceScheme/findSchemePrice',{params:params});
}
