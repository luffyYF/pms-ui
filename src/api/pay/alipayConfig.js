import request from '@/utils/requestJsonPay'

export const saveOrUpdate = params => {
    return request.post(`/alipayConfig/saveOrUpdate`, params)
}

export const getConfig = params => {
return request.get(`/alipayConfig/getConfig`,{params:params})
}