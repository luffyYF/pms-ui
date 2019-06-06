import request from '@/utils/requestJson'
export const listMemberCardExchange = params => {
    return request.get('/back/member/card/list', {params: params})
 }

 export const delMemberCardDetail = params => {
    return request.get('/back/member/card/del',{params: params})
 }
