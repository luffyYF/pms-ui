import router from './router'
import {asyncRouterMap} from './router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from 'element-ui'
import store from './store/index'
import {getToken} from './utils/auth'
import Cookies from 'js-cookie'
// Progress 进度条
// Progress 进度条样式
// 验权

// permissiom judge
// function hasPermission (roles, permissionRoles) {
//   // admin权限 直接通过
//   if (roles.indexOf('admin') >= 0) return true
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

/**
 * 获取url参数
 * @param {*} name 参数名称
 */
function getUrlParam(name){
  return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}

// 不重定向白名单
// const whiteList = ['/login', '/authredirect']
const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  // 开启Progress
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next()
  }else{
    //begin本地调试，设置token缓存
    // if(!process.env.SERVER_FLAG){
    // }
    let url_token = getUrlParam('token');
    if(url_token){
      localStorage.setItem('token', url_token)
      window.location.href=location.href.substring(0,location.href.indexOf('?'))
      return;
    }
    //end
    
    let token = window.localStorage.getItem('token');
    if(token){
      // if(to.path=='/'){
      //   //重新选择分点班次
      //   // next('/classSelection');
      //   next()
      // }else{
       
      // }
      // console.log('aaaax',localStorage.getItem('pms_userinfo'))
      if(to.path!=='/classSelection' && (!localStorage.getItem('pms_userinfo') || !Cookies.get('select_company_pk') || !Cookies.get('select_shift_pk'))){
        //没有选择
        next('/classSelection');
      }else{
        next()
      }
    }else{
      next('/login')
      NProgress.done()      
    }
  }
})

router.afterEach(() => {
  // 结束Progress
  NProgress.done()
})

/**
 * 路由错误
 */
router.onError((e) => {
  // 结束Progress
  NProgress.done()
})
