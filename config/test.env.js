'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')


module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://kerry.natapp4.cc/pms"',
  IMAGE_ROOT: '"http://kerry.natapp4.cc"'
})
