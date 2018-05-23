import router from './router'
import {asyncRouterMap} from './router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from 'element-ui'
import store from './store/index'
import {getToken} from './utils/auth'
// Progress 进度条
// Progress 进度条样式
// 验权

// permissiom judge
function hasPermission (roles, permissionRoles) {
  // admin权限 直接通过
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

// 不重定向白名单
const whiteList = ['/login', '/authredirect']

router.beforeEach((to, from, next) => {
  // 开启Progress
  NProgress.start()
  // 判断是否有token
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
      // NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        next()
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          console.log(res)
          window.localStorage.setItem("LOFIN_USER_INFO",JSON.stringify(res));
        //   const roles = res.data.role

          // // 组织架构
          // asyncRouterMap[0].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          //
          // asyncRouterMap[1].children[0].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          // asyncRouterMap[1].children[1].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          // asyncRouterMap[1].children[3].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          // // 菜品
          // asyncRouterMap[1].hidden = (store.getters.joinFlag === 'Y')
          //
          // // 采购材料
          // asyncRouterMap[2].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          // // asyncRouterMap[2].children[0].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          // // asyncRouterMap[2].children[1].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          //
          // // 统计
          // asyncRouterMap[3].children[0].hidden = (store.getters.joinFlag === 'Y')
          // asyncRouterMap[3].children[1].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          // asyncRouterMap[3].children[3].hidden = (store.getters.joinFlag === 'Y')
          // // asyncRouterMap[1].children[3].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          //
          // // asyncRouterMap[4].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          // asyncRouterMap[5].children[0].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          // asyncRouterMap[5].children[2].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          // asyncRouterMap[5].children[6].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')
          //
          // asyncRouterMap[6].hidden = (store.getters.shopId !== undefined && store.getters.shopId !== null && store.getters.shopId !== '')

          // store.dispatch('GenerateRoutes', {roles}).then(() => { // 生成可访问的路由表
          //   动态添加可访问路由表
          //   router.addRoutes(store.getters.addRouters)
          //   next({...to}) // hack方法 确保addRoutes已完成
          // })
        // }).catch(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     Message.error('验证失败,请重新登录')
        //     next({path: '/login'})
        //   })
        })

          // const roles = res.data.role
        store.dispatch('GenerateRoutes', {roles: 'admin'}).then(() => { // 生成可访问的路由表
          //   动态添加可访问路由表
          router.addRoutes(store.getters.addRouters)
          next({...to}) // hack方法 确保addRoutes已完成
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.role)) {
          // 跳转菜单目录
          let shopId = to.query.shopId
          if (store.getters.shopId) {
            shopId = store.getters.shopId
          }
          if ((to.path === '/goods_info' || to.path === '/orgShopUser' || to.path === '/tableManage') && shopId === undefined) {
            if (from.path !== '/orgShop') {
              next('/orgShop')
            } else {
              NProgress.done()
            }
          } else {
            next()
          }
        } else {
          next({path: '/401', query: {noGoBack: true}})
          // NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
        // 可删
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      // NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
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
