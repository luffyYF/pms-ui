'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://zh.taofangt.com:8291/test-upms"',
  IMAGE_ROOT: '"http://zh.taofangt.com:8291/test-fs"'
})
