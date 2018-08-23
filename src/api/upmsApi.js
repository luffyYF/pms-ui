import requestUpms from '../utils/requestJsonUpms'
/**
 * 请求权限系统api
 */

//请求登录
export const loginByUsername = params => {
  return requestUpms.post('/login', params)
}
//刷新TOKEN
export const refreshTokenUpms = params => {
  return requestUpms.post('/refreshToken', params)
}
//退出登录
export const logout = () => {
  return requestUpms.post('/logout')
}
//获取角色列表
export const listRoles = params => {
  return requestUpms.get('/role/listRoles', {params:params})
}
//检查用户是否唯一 【废】
export const checkOnlyUser = params => {
  return requestUpms.post('/users/checkOnlyUser/'+params)
}
//修改用户的操作员信息【废】
export const updateOperater = params => {
  return requestUpms.post('/users/updateOper',params)
} 
//修改用户锁定状态 【废】
export const updateStatus = params => {
  return requestUpms.post('/users/updateStatus',params)
} 
//重置用户密码 【废】
export const resetPwd = params => {
  return requestUpms.post('/users/resetPwd/'+params)
}
//获取权限系统当前登录用户信息 【废】
export const getUpmsUserInfo = params => {
  return requestUpms.get('/getUpmsUserInfo',{params:params})
} 

//修改当前的登录用户的密码
export const modifyPwd = params => {
  return requestUpms.post('/backend/users/modifyPwd',params)
}



