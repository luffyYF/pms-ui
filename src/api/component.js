import request from '../utils/requestJson'

export const getShopSelect = () => {
  return request.get('/common/shop/select')
}
