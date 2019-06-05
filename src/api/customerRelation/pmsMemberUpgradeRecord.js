import request from '@/utils/requestJson'

export const memberUpgradeRecord = params => {
    return request.get('/back/memberUpgradeRecord/list', {params: params})
 }