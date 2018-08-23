import request from '@/utils/requestJson'

/**
 * 员工接口
 * @param params
 * @returns {AxiosPromise<any>}
 */

export const listUser = params => {
    return request.get('/back/pmsUser/list',{params:params})
}
export const addUser = params => {
    return request.get('/back/pmsUser/add',{params:params})
}

//保存员工
export const pmsUserAdd = params => {
    return request.post('/back/pmsUser/add',params)
}
//删除员工
export const pmsUserDel = params => {
    return request.post('/back/pmsUser/del',params)
}
//查找员工
export const pmsUserList = params => {
    return request.get('/back/pmsUser/list',{params:params})
}
//修改员工
export const pmsUserUpdate = params => {
    return request.post('/back/pmsUser/update',params)
}
//添加操作员
export const addOperater = params => {
    return request.post('/back/pmsUser/oper/addOperater',params)
}
//删除操作员
export const pmsUserDelOperator = params => {
    return request.post('/back/pmsUser/oper/delOperater',params)
}
//添加操作员时，选择员工下拉列表
export const pmsOperListSelect = params => {
    return request.get('/back/pmsUser/oper/listSelect',{params:params})
}
//查找操作员列表
export const pmsUserListOperator = params => {
    return request.get('/back/pmsUser/oper/listOperater',{params:params})
}
//操作员重置密码
export const pmsUserResetOperPwd = params => {
    return request.post('/back/pmsUser/resetOperPwd',params)
}
//重置密码
export const pmsUserResetPwd = params => {
    return request.post('/back/pmsUser/resetPwd',params)
}

//查找收银员
export const listCashierOperator = params => {
    return request.get('/back/pmsUser/listCashier',{params:params})
}
