const path = require('path')
const config = require('./conf')

exports.assetsPath = function (_path) {
  let { conf } = exports.getEnvConf()
  return path.posix.join(conf.assetsSubDirectory, _path)
}

exports.resolve = function (...basicPath) {
  return function (dir) {
    return path.join(...basicPath, dir || '')
  }
}

exports.getEnvConf = function () { 
  let env = process.env.NODE_ENV || 'production'
  let conf = config[env]
  return { env, conf }
}

exports.getEntry = function() {
  const { env, conf } = exports.getEnvConf()
  let entry = {};

  if (env === 'production' || env === 'test') {
     entry.app = conf.entryPath || './src/index.js'
  } else if (env === 'development') {
     const { port, devServerIp, entryPath } = conf
     entry.app = [`webpack-dev-server/client?http://${devServerIp}:${port}/`, 'webpack/hot/dev-server', entryPath || './src/index.js'];
  }
  return entry
}

exports.getOutput = function () { 
  const { env, conf } = exports.getEnvConf()
  filename = exports.assetsPath(env === 'development' ? 'js/[name].js' : 'js/[name].js?[chunkhash:7]')
  chunkFilename = env === 'development' ? 'chunk/[name].js' : 'chunk/[name].js?[chunkhash:7]'

  return {
    filename,
    chunkFilename,
    path: conf.assetsRoot,
    publicPath: conf.assetsPublicPath
  }
}

