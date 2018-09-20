'use strict';

const ip = require('ip').address()
const path = require('path')

const resolve = function (dir) { 
  return path.join(__dirname, '../../', dir)
}

module.exports = {
  base: {
    context: resolve(''),
    node_modules: resolve('node_modules'),
    sourceCode: resolve('src'),
    entryTemp: resolve('src/template/index.ejs')
  },
  development: {
    env: require('./dev.env'),
    port: process.env.PORT || 3003, // 设置开发时端口号
    devServerIp: ip,
    entryPath: null, // 默认为 './src/index.js'
    assetsRoot: resolve('dist'), // 编译后的静态资源路径
    assetsSubDirectory: 'static', // 二级资源路径
    // 编译发布的根目录
    assetsPublicPath: `/` 
  },
  test: {
    env: require('./test.env'),
    entryPath: null, // 默认为 './src/index.js'
    assetsRoot: resolve('dist'), // 编译后的静态资源路径
    assetsSubDirectory: 'static', // 二级资源路径
    // 一般为静态资源CDN路径
    assetsPublicPath: `/` // 编译发布的根目录
  },
  production: {
    env: require('./prod.env'),
    entryPath: null, // 默认为 './src/index.js'
    assetsRoot: resolve('dist'), // 编译后的静态资源路径
    assetsSubDirectory: 'static', // 二级资源路径
    // 一般为静态资源CDN路径
    assetsPublicPath: `/` // 编译发布的根目录
  }
}