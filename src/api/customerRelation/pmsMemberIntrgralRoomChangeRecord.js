import request from '@/utils/requestJson'

export const memberIntegralRoomChangeRecord = params => {
    return request.get('/back/pmsIntegralRoomChangeRecord/list', {params: params})
 }