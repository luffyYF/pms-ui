'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/pms"',
  IMAGE_ROOT: '"/fs"',
  UPMS_ROOT:'"http://192.168.5.3:8084"',
  UPLOAD_ROOT: '"http://localhost"',//上传文件的地址 微云系统
  OA_ROOT:'"http://192.168.5.3:8085"',
  PRINT_ROOT: '"http://192.168.5.3:8084/"',
  SERVER_FLAG:false,//是否是正式服标识 true是正式服 false本地测试
})
