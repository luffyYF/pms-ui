import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken, removeToken, removeRefreshToken} from './auth'
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
  let token = window.localStorage.getItem('token');
  config.headers['Authorization']='Bearer '+token
  return config;
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data
    if (res.code !== 1) {
      if (res.code === 10103) {
        Message({message: '帐号不存在', type: 'error', duration: 5 * 1000})
      } else if (res.code === 10105) {
        Message({message: '无效帐号', type: 'error', duration: 5 * 1000})
      } else if (res.code === 10102) {
        Message({message: '密码不能为空', type: 'error', duration: 5 * 1000})
      } else if (res.code === 10104) {
        Message({message: '密码错误', type: 'error', duration: 5 * 1000})
      } else if (res.code === 10011) {
        Message({message: '参数不全', type: 'error', duration: 5 * 1000})
      } else if (res.code === 10001) {
        Message({message: '无效长度', type: 'error', duration: 5 * 1000})
      } else if (res.code === 10100) {
        Message({message: '数据为空', type: 'error', duration: 5 * 1000})
      } else if (res.code === 10101) {
        Message({message: '用户名不能为空', type: 'error', duration: 5 * 1000})
      } else if (res.code === 10203) {
        // 登录失效 跳转到登录页面
        if (store.getters.token) {
          removeToken()
          removeRefreshToken()
          router.push({ path: '/login' })
          // store.dispatch('LogOut')
          // Message({message: '登录验证失效,请重新登录', type: 'error', duration: 5 * 1000})
        }                
      } else if (res.code === 10205) {
        // 10205:无效的token; 50012:其他客户端登录了;  50014:Token 过期了;
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 为了重新实例化vue-router对象 避免bug
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        })
      } else {
        Message({message: res.sub_msg, type: 'error', duration: 5 * 1000})
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
