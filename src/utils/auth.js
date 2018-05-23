import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RefreshTokenKey = 'Admin-refresh-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// export function getToken () {
//   return window.localStorage.getItem(TokenKey)
// }

// export function setToken (token) {
//   return window.localStorage.setItem(TokenKey, token)
// }

// export function removeToken () {
//   return window.localStorage.removeItem(TokenKey)
// }

export function getRefreshToken () {
  return window.localStorage.getItem(RefreshTokenKey)
}

export function setRefreshToken (token) {
  return window.localStorage.setItem(RefreshTokenKey, token)
}

export function removeRefreshToken () {
  return window.localStorage.removeItem(RefreshTokenKey)
}
