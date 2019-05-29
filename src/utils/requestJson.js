import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
// import store from '@/store'
// import {getToken, removeToken, removeRefreshToken} from './auth'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  // api的base_url
  baseURL: process.env.API_ROOT,
  // 请求超时时间
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  // } else if (config.url != '/login') {
  //   router.push({ path: '/login' })
  // }
  //身份验证携带请求头
  let token = localStorage.getItem('token') 
  config.headers['Authorization'] = 'Bearer '+token

  //当前选择的公司主键和班次主键
  let companyPk = localStorage.getItem('select_company_pk');
  // let shiftPk = localStorage.getItem('select_shift_pk');
  config.headers['CompanyPk']=companyPk==null?'':companyPk;
  // config.headers['ShiftPk']=shiftPk==null?'':shiftPk;

  return config;
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    var authorization = response.headers.authorization
    if (authorization) {
      localStorage.setItem('token', authorization)
    }
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    if (response.status == 203) {
      Message({message: "登录失效，请重新登录", type: 'error', duration: 5 * 1000})
      router.push({ path: '/login' })
      return
    }
    const res = response.data
    if (res.code !== 1) {
      if(res.sub_msg) {
        Message({message: res.sub_msg, type: 'error', duration: 5 * 1000})
      }else {
        Message({message: res.msg, type: 'error', duration: 5 * 1000})
      }

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    //TODO 暂时注释
    // Message({message: "网络连接失败", type: 'error', duration: 5 * 1000})
    console.log("网络连接失败")
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  })

export default service
