// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import './filter'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/utils/zhcn_moment.js'
import App from './App'
import AMap from 'vue-amap'
import router from './router/index'
// import store from './store/index'
import './permission'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './components/common/index'
import 'swiper/dist/css/swiper.css'
// import './utils/timer'
import fullCalendar from 'vue-fullcalendar'
import './directive'
import {hasPermission} from "@/utils/hasPermission";
import {refreshPmsType} from "@/utils/refreshPmsType";

// import './mock' // simulation data
// import 'babel-polyfill'
//全局的常量
Vue.prototype.hasPerm = hasPermission
Vue.prototype.refreshType = refreshPmsType
// Vue.prototype.getRPath = getRPath
Vue.use(VueAwesomeSwiper, {})

// 开启debug模式
// Vue.config.debug = true
Vue.config.productionTip = false

Vue.use(AMap)
Vue.use(ElementUI)
Vue.component('full-calendar', fullCalendar)

AMap.initAMapApiLoader({
  key: '986f2b7af9700123edab61faa7aaf92a',
  // key: '6e8b473eb40be93815ea08d0418b1faf',
  plugin: ['Geocoder']
  // plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'Geocoder']
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: {App}
})
