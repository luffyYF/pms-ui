import request from '@/utils/requestJson'

/**
 * 處理樓層數據
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listStorey = params => {
  return request.get('/back/storey/list')
}

export const addStorey = params => {
  return request.post('/back/storey/add', params)
}
// 批量添加楼层
export const addStoreys = params => {
  return request.post('/back/storey/adds', params)
}

export const updateStorey = params => {
  return request.post('/back/storey/update', params)
}

export const delStorey = params => {
  return request.post('/back/storey/del', params)
}

/**
 * 處理房間數據
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const listRoom = params => {
  return request.get('/back/room/list',{params:params})
}
//新-关联房锁数据房间列表
export const listStoreyRoom = params => {
  return request.get('/back/room/listStoreyRoom',{params:params})
}
export const batchUpdateRoomProp = params => {
  return request.post('/back/room/batchUpdateRoomProp',params)
}

// 添加一個房間
export const addRoom = params => {
  return request.post('/back/room/add', params)
}
// 批量添加房間
export const addRooms = params => {
  return request.post('/back/room/adds', params)
}
// 批量添加预览数据
export const previewRooms = params => {
  return request.post('/back/room/preview', params)
}

export const updateRoom = params => {
  return request.post('/back/room/update', params)
}

export const delRoom = params => {
  return request.post('/back/room/del', params)
}

/**
 * 获取rfl相关的房间信息（用于宏安兴制卡）
 * @param roomPk 房间主键
 */
export const getRflRoomInfo = params => {
  return request.get('/back/room/getRflRoomInfo', {params:params})
}
/**
 * 
 * @param {查找楼层} params 
 */
export const selectStorey = params => {
  return request.get('/back/storey/selectStorey', {params:params})
}
/**
 * 
 * @param {散客和房型} params 
 */
export const listRoomTypePrice = params => {
  return request.get('/back/roomTypePrice/listRoomTypePrice', {params:params})
}
/**
 * 
 * @param {根据楼栋主键查找楼层} params 
 */
export const listStoreyByBuildingPk = params => {
  return request.get('/back/storey/listStoreyByBuildingPk', {params:params})
}


