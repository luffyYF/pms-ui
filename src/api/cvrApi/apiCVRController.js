import request from '@/utils/requestJson'

//生成唯一CODE值
export const generatorCode = params => {
    return request.get('/api/cvr/generatorCode',{params:params})
}
//获取身份证信息
export const getIDCardInfo = params => {
    return request.get('/api/cvr/getIDCardInfo', {params:params})
}
//保存身份证读取记录
export const saveCvrRecord = params => {
    return request.post('/api/cvr/saveRecord', params)
}
