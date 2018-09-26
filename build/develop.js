const path = require('path')
const { development: develop } = require('./conf')
if (!process.env.NODE_ENV) { 
  process.env.NODE_ENV = JSON.parse(develop.env.NODE_ENV)
}


const webpack = require('webpack')
const config = require('./webpack.dev')
const webpackDevServer = require('webpack-dev-server')

let compiler = webpack(config)
let server = new webpackDevServer(compiler, {
  inline: true,
  // boolean string array
  contentBase: path.resolve(__dirname, '../src'),
  // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  historyApiFallback: true,
  hot: true,
  // 一切服务都启用 gzip 压缩
  compress: false,
  open: true,
  // 指定打开浏览器时的导航页面
  openPage: '/index.html',
  // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用
  overlay: {
    warnings: false,
    errors: true
  },
  // 代理设置
  proxy: {
    '/api': 'http://localhost:3000'
  },
  // 告知服务器，观察 devServer.contentBase 下的文件。文件修改后，会触发一次完整的页面重载。默认禁用
  watchContentBase: true,
  // 此选项允许浏览器使用本地 IP 打开
  useLocalIp: true,
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