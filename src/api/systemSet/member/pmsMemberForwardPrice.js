import request from '@/utils/requestJson'


//会员远期房价
export const listForwardPrice = params => {
    return request.get('/back/memberForwardPrice/list',{params:params})
}
//会员远期房价
export const listAgreementListPrice = params => {
    return request.get('/back/memberForwardPrice/agreementList',{params:params})
}
//会员远期房价
export const settingPrice = params => {
    return request.post('/back/memberForwardPrice/settingPrice',params)
}
//会员远期房价
export const settingAgreementPrice = params => {
    return request.post('/back/memberForwardPrice/settingAgreementPrice',params)
}

//单个会员远期房价设置
export const singleSettingPrice = params => {
    return request.post('/back/memberForwardPrice/singleSettingPrice',params)
}

