import Vue from 'vue'
import Router from 'vue-router'




//一级菜单
import ClassSelection from '@/pages/ClassSelection.vue'
import Login from '@/pages/Login.vue'
import NotFound from '@/pages/404.vue'

import home from '@/router/home/index'
import room from '@/router/room/index'

Vue.use(Router)

/**
 * 项目启动就有权限
 * @type {*[]}
 */
export const routes = [
  // 登录
  {path: '/login', hidden: true, component: Login, name: '登录'},
  {path: '/404', hidden: true, component: NotFound, name: '404页面'},
  {path: '/classSelection', hidden: true,component: ClassSelection, name: '班次选择'}
]

routes.push(home)
routes.push(room)

export default new Router({
  routes: routes
})
