import router from './router'
import {asyncRouterMap} from './router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from 'element-ui'
// import store from './store/index'
// import {getToken} from './utils/auth'
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
const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  // 解决重复点击顶级目录导致路由页面空白的问题
  // console.log("to",to);
  // console.log("from",from);
  if(to.path!="/" && from.path.indexOf(to.path)!=-1){
    next(false);
    return;
  }


  // 开启Progress
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next()
  }else{
    //begin 从URL中获取TOKEN
    let url_token = getUrlParam('token');
    if(url_token){
      localStorage.setItem('token', url_token)
      // window.location.href=location.href.substring(0,location.href.indexOf('?')) 
      history.pushState({}, "PMS", location.href.substring(0,location.href.indexOf('?')));
      next('/classSelection')
      return;
    }
    //end
    
    let token = window.localStorage.getItem('token');
    if(token){
      if(to.path!=='/classSelection' && (!localStorage.getItem('pms_userinfo') || !localStorage.getItem('select_company_pk'))){
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
