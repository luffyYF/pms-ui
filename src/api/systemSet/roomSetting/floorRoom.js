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


