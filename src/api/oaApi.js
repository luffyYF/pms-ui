import requestOa from '../utils/requestJsonOa'

/**
 * 权限系统库存接口
 */

/**
 * 取消申请
 * @param params
 */
export const cancelApply = params => {
  return requestOa.get('/backend/approval/ex/recall',{params:params})
}
export const listApi = params => {
  return requestOa.get('/backend/sysUser/list',{params:params})
}
export const updateApi = params => {
  return requestOa.post('/backend/sysUser/update', params)
}

/**
 * 排班管理接口
 * @param params
 */
// 查找数据
export const listGroupApi = params => {
  return requestOa.get('/backend/attendanceGroup/list', { params: params })
}

/**
 *  考勤组(班次组)表controller
 */
// 查找考勤组列表
export const attendanceGroupList = params => {
  return requestOa.get('/backend/attendanceGroup/list', { params: params })
}
//添加考勤组
export const attendanceGroupAdd = params => {
  return requestOa.post('/backend/attendanceGroup/add', params)
}
//编辑考勤组
export const attendanceGroupUpdate = params => {
  return requestOa.post('/backend/attendanceGroup/update', params)
}
//考勤组详情
export const attendanceGroupDetail = params => {
  return requestOa.get('/backend/attendanceGroup/detail', { params: params })
}
//删除考勤组
export const attendanceGroupDelete = params => {
  return requestOa.get('/backend/attendanceGroup/delete', { params: params })
}
//查找考勤下拉列表
export const attendanceListSelect = params => {
  return requestOa.get('/backend/attendanceGroup/listSelect', { params: params })
}

/**
 * 班次表controller
 */
//添加班次
export const attendanceClassAdd = params => {
  return requestOa.post('/backend/attendanceClass/add', params)
}
//查询班次列表
export const attendanceClassList = params => {
  return requestOa.get('/backend/attendanceClass/list', { params: params })
}
//班次下拉列表
export const attendanceClassSelect = params => {
  return requestOa.get('/backend/attendanceClass/selectList', { params: params })
}
//班次详情
export const attendanceClassDetail = params => {
  return requestOa.get('/backend/attendanceClass/detail', { params: params })
}
//编辑班次
export const attendanceClassUpdate = params => {
  return requestOa.post('/backend/attendanceClass/update', params)
}
//删除班次
export const attendanceClassDelete = params => {
  return requestOa.get('/backend/attendanceClass/delete',  {params: params})
}
//查找组-班次级联下拉列表
export const attendanceClassCascaderList = params => {
  return requestOa.get('/backend/attendanceClass/cascaderList',  {params: params})
}

/**
 *  排班计划日程安排表controller
 */
//查找排班 
export const attendancePlanList = params => {
  return requestOa.get('/backend/attendancePlan/list', { params: params })
}
//添加排班
export const attendancePlanAdd = params => {
  return requestOa.post('/backend/attendancePlan/add', params)
}
//添加排班
export const attendancePlanDelete = params => {
  return requestOa.post('/backend/attendancePlan/delete', params)
}

// 查询所有班次组
export const getAllApi = params => {
  return requestOa.get('/backend/attendanceGroup/getAll', { params: params })
}
// 查询班次组的参数配置和考勤地址
export const getSettingAndAddress = params => {
  return requestOa.get('/backend/attendanceGroup/getSettingAndAddress', { params: params })
}
// 添加参数配置和考勤地址
export const addSettingAndAddress = params => {
  return requestOa.post('/backend/attendanceGroup/addSettingAndAddress', params)
}