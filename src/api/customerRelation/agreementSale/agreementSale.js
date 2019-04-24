import request from '@/utils/requestJson'

export const listAgreementSale = params => {
    return request.get('/back/agreementSale/list', {params: params})
}
 
export const addSale = params => {
   return request.post('/back/agreementSale/add', params)
}

export const updateSale = params => {
   return request.post('/back/agreementSale/update', params)
}

export const deleteSale = params => {
    return request.post('/back/agreementSale/delete/'+ params)
 }