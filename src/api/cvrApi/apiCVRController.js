import request from '@/utils/requestJson'

//生成唯一CODE值
export const generatorCode = params => {
    return request.get('/api/cvr/generatorCode',{params:params})
}
//获取身份证信息
export const getIDCardInfo = params => {
    return request.get('/api/cvr/getIDCardInfo', {params:params})
}
