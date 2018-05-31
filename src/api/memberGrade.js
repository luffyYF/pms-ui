import request from '../utils/requestJson'

export const memberGradeList = () =>{
    return request.get('/back/grade/list')
}