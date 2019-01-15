import request from '@/utils/requestJson'

 // 会议室接口
export const listMtgRoom = params => {
   return request.get('/back/mtgRoom/list')
}

export const addMtgRoom = params => {
   return request.post('/back/mtgRoom/add', params)
}

export const updateMtgRoom = params => {
   return request.post('/back/mtgRoom/update', params)
}

export const delMtgRoom = params => {
   return request.post('/back/mtgRoom/del', params)
}

// 会议室预定档期接口
export const listBookDqByRoomPkAndDate = params => {
   return request.get('/back/mtgBookDq/listBookDqByRoomPkAndDate',{params:params})
}

export const listBookDqByDate = params => {
   return request.get('/back/mtgBookDq/listBookDqByDate',{params:params})
}

export const listBookDqByRoomPkAndBookPk = params => {
   return request.get('/back/mtgBookDq/list',{params:params})
}

export const batchOperateDq = params => {
   return request.post('/back/mtgBookDq/batchOperateDq',params)
}

// 会议室预定接口
export const addBookAndDq = params => {
   return request.post('/back/mtgBook/addBookAndDq',params)
}

export const updateBook = params => {
   return request.post('/back/mtgBook/update',params)
}

//哑房账接口
export const listDumbHouse = params => {
    return request.get('/back/dumbHouse/list',{params,params})
 }
//查询哑房账详情接口
export const getDumbByPk = params => {
    return request.get('/back/dumbHouse/getDumbByPk',{params,params})
 }
 
 export const addDumbAndBill = params => {
    return request.post('/back/dumbHouse/addDumbAndBill',params)
 }

//订单接口
export const mtgRoomGroupOrderList = params => {
    return request.get('/back/order/mtgRoomGroupOrderList',{params,params})
}
