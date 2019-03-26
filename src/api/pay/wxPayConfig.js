import request from '@/utils/requestJsonPay'

export const saveOrUpdate = params => {
    return request.post(`/wxPayConfig/saveOrUpdate`, params)
}

export const getConfig = params => {
return request.get(`/wxPayConfig/getConfig`,{params:params})
}
  