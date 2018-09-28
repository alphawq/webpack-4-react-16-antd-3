var path = require('path')
var webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var vendors = [
  'antd',
  'axios',
  'react',
  'react-dom',
  'react-router',
  'react-loadable'
]

module.exports = {
  mode: 'production',
  performance: {
    hints: 'error'
  },
  entry: {
    vendor: vendors,
  },
  output: {
    path: path.resolve(__dirname, '..', 'static/js/'),
    filename: 'dll.[name].js?[chunkhash:7]',
    library: '[name]_[chunkhash:7]',
  },
  optimization: {
    minimize: true,
    // 允许您通过提供不同的一个或多个自定义UglifyjsWebpackPlugin实例来覆盖默认压缩器
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
        uglifyOptions: {
          ie8: true,
          ecma: 8,
        }
      })
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_[chunkhash:7]',
      path: path.join(__dirname, '[name]-manifest.json'),
    }),
    new AssetsPlugin({
      filename: 'dll-config.json',
      path: __dirname
    })
  ]
}