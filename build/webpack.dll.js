var path = require('path')
var webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')

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
  entry: {
    vendor: vendors,
  },
  output: {
    path: path.resolve(__dirname, '..', 'static/js/'),
    filename: 'dll.[name].js?[chunkhash:7]',
    library: '[name]_[chunkhash:7]',
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
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