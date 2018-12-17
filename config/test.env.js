'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')


module.exports = merge(devEnv, {
  NODE_ENV: '"testb"',
  API_ROOT: '"http://192.168.5.6/pms-back"',
  IMAGE_ROOT: '"http://192.168.5.6/"',
  UPLOAD_ROOT: '"http://192.168.5.6/wechat-back"',//上传文件的地址，使用微云服务器
  UPMS_ROOT:'"http://192.168.5.6/upms-back"',
  OA_ROOT:'"http://192.168.5.6/oa-back"',
  PRINT_ROOT: '"http://192.168.5.6/printing/"',
  SERVER_FLAG:true,//是否是正式服标识 true是正式服 false本地测试
})
