import request from '@/utils/requestJson';

//添加虚拟单
export const addVirtual = params => {
    return request.post('/back/pmsVirtualBill/addVirtual', params)
}

//虚拟单列表
export const virtualList = params => {
    return request.get('/back/pmsVirtualBill/virtualList', {params,params})
}
//虚拟单列表
export const virtualPrint = params => {
    return request.get('/back/pmsVirtualBill/virtualPrint', {params,params})
}