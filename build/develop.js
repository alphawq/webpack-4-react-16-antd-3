const path = require('path')
const { development: develop } = require('./conf')
if (!process.env.NODE_ENV) { 
  process.env.NODE_ENV = JSON.parse(develop.env.NODE_ENV)
}


const webpack = require('webpack')
const config = require('./webpack.dev.config')
const webpackDevServer = require('webpack-dev-server')

let compiler = webpack(config)
let server = new webpackDevServer(compiler, {
  inline: true,
  contentBase: path.resolve(__dirname, '../src'),
  historyApiFallback: true,
  hot: true,
  compress: false,
  stats: {
    colors: true,
    errors: true,
    warnings: true,
    modules: false,
    chunks: false
  }
})
server.listen(develop.port, develop.devServerIp || 'localhost', () => {

})