import Vue from 'vue'
import {sourceImgUrl} from '../api/upload'

Vue.filter('sourceImgUrl', function (value) {
  // 图片不存在
  if (!value) {
    return ''
  }
  // 图片包含http 或 https
  if (value.indexOf('http://') > -1 || value.indexOf('https://') > -1) {
    return value
  }
  // 拼接上项目前缀http或https
  return sourceImgUrl + value
})
