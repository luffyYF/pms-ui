import request from '../utils/requestJson'
import requestUpms from '../utils/requestJsonUpms'


// export const loginByUsername = params => {
//   return request.post('/login', params)
// }

export const getUserInfo = params => {
  return request.get('/userInfo', params)
}

//废
export const refreshToken = params => {
  return request.get('/sso/refreshToken', {params: params})
}

//查找公司(分店)和班次班次
export const getCompanyShift = () => {
  return request.get('/back/get/company/shift')
}

//选择公司（分店）和班次班次
export const selectCompanyShift = params => {
  return request.get('/back/select/company/shift',{params:params})
}
