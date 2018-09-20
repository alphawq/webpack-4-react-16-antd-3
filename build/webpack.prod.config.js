const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 该插件已不再支持webpack@4.3.0
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(base, {
  /**
   *  会将 process.env.NODE_ENV 的值设为 production。
   *  启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, 
   *  ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, 
   *  OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
   */ 
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            // publicPath: '../'
          }
        }, 'css-loader', 'less-loader'],
          // ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          // use: ['css-loader', 'less-loader']
          // }),  
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: process.cwd() }),
    // 参见【缓存】章节 https://webpack.docschina.org/guides/caching
    new webpack.HashedModuleIdsPlugin(),
    // ExtractTextPlugin
    new MiniCssExtractPlugin({
      filename: 'app.[contenthash:7].css',
      chunkFileName: '[name].[contenthash:7].css'
    })
  ]
})