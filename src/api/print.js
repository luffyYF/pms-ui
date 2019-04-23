import request from '@/utils/requestJson'

//查找RC单打印数据
export const rcprint = params => {
    return request.get('/api/print/rcprint',{params:params})
}