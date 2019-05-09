import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
// import store from '@/store'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  // api的base_url
  baseURL: process.env.UPMS_ROOT,
  // 请求超时时间
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  config.headers['Authorization'] = 'Bearer '+token
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
    const res = response.data
    if (res.code !== 1) {
      if(res.sub_msg){
        Message({message: res.sub_msg, type: 'error', duration: 5 * 1000})
      }else{
        Message({message: res.msg, type: 'error', duration: 5 * 1000})
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    Message({message: "网络连接失败", type: 'error', duration: 5 * 1000})
    console.log("网络连接失败")
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  })

export default service
