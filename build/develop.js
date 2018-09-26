const path = require('path')
const opn = require('opn')
const chalk = require('chalk')
const { development: develop } = require('./conf')
if (!process.env.NODE_ENV) { 
  process.env.NODE_ENV = JSON.parse(develop.env.NODE_ENV)
}
const webpack = require('webpack')
const config = require('./webpack.dev')
const webpackDevServer = require('webpack-dev-server')
const { devServerIp, port } = develop

let compiler = webpack(config)
let server = new webpackDevServer(compiler, {
  inline: true,
  // boolean string array
  contentBase: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../static')],
  // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  historyApiFallback: true,
  hot: true,
  // 一切服务都启用 gzip 压缩
  compress: true,
  // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用
  overlay: {
    warnings: false,
    errors: true
  },
  // 代理设置
  proxy: {
    '/api': `http://${devServerIp}:3000`
  },
  // 告知服务器，观察 devServer.contentBase 下的文件。文件修改后，会触发一次完整的页面重载。默认禁用
  watchContentBase: true,
  // 此选项允许浏览器使用本地 IP 打开
  // useLocalIp: true,
  stats: {
    colors: true,
    errors: true,
    warnings: true,
    modules: false,
    chunks: false
  }
})

server.listen(port, devServerIp || 'localhost', () => {
  const link = `http://${devServerIp}:${port}`
  console.log(chalk.cyan(`Starting server on ${link}`))

  opn(link).then(() => {
    console.log(chalk.cyan('success open ...'))
  }).catch(err => {
    console.log(chalk.red(err))
  })
})