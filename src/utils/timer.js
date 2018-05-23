import {refreshToken} from '../api/login'
import {setToken, getRefreshToken} from './auth'

setInterval(() => {
  refreshToken({refreshToken: getRefreshToken()}).then(res => {
    if (res.code === 1) {
      setToken(res.data)
    }
  })
}, 1000 * 60 * 60)
