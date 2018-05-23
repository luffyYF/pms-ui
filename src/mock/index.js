import Mock from 'mockjs'
import loginAPI from './login'
import teamAPI from './teamSearch'
import forwardHousingApi from './forwardHousing'
// import articleAPI from './article'
// import remoteSearchAPI from './remoteSearch'
// import transactionAPI from './transaction'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/sso\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/sso\/userInfo\.*/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/sso\/getTeamMap\.*/, 'get', teamAPI.getTeamMap)
// 文章相关
// Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
// Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
// Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
// Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
// Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
// Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser) 
Mock.mock(/\/search\/getRoomsData\.*/, 'get', forwardHousingApi.getRoomsData)

// 账单相关
// Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
