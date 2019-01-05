import request from '@/utils/requestJson';

//添加虚拟单
export const addVirtual = params => {
    return request.post('/back/pmsVirtualBill/addVirtual', params)
}