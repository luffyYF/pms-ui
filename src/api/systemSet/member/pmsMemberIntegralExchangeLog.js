import request from '@/utils/requestJson'
export const listIntegralExchangeLog = params => {
    return request.get('/pmsMemberIntegralExchangeLog/list',{params:params})
 }
 