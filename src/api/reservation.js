import request from '../utils/request'

export const reservationApi = {
  listReservation: params => {
    return request.get('/sys/reservation/listReservation/' + params.shopId + '/' + params.startTime + '/' + params.endTime)
  },
  saveReservation: params => {
    return request.post('/sys/reservation/saveReservation', params)
  },
  updateReservation: params => {
    return request.post('/sys/reservation/updateReservation', params)
  },
  removeReservation: params => {
    return request.post('/sys/reservation/removeReservation', params)
  },
  getReservation: params => {
    return request.get('/sys/reservation/getReservation?tableId=' + params)
  }
}
