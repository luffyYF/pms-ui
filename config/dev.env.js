'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"/pms"',
  IMAGE_ROOT: '"/fs/"',
  UPLOAD_ROOT: '"http://192.168.5.11:80/"',//上传文件的地址，使用微云服务器
  UPMS_ROOT: '"http://192.168.5.6/upms-back"',
  OA_ROOT: '"http://192.168.5.6/oa-back"',
  PRINT_ROOT: '"http://192.168.5.6/printing/"',
  PAY_ROOT: '"http://192.168.5.6/pay-tomcat/"',
  CMS_ROOT: '"http://192.168.5.6/cms/"',
  SERVER_FLAG: false,//是否是正式服标识 true是正式服 false本地测试
})
