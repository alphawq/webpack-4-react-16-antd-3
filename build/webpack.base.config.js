'use strict'

const path = require('path')
const { base: baseConf } = require('./conf')
const { getEntry, getOutput, assetsPath } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// console.log(process.env.NODE_ENV, '<<<') // undefined

module.exports = {
  mode: 'none',
  // entry 和 module.rules.loader 选项相对于context解析
  context: baseConf.context,
  entry: getEntry(),
  output: getOutput(),
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [baseConf.sourceCode, baseConf.node_modules],
    alias: {
      'static': path.resolve(__dirname, '../static')
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        query: {
          limit: 1024 * 8,
          name: assetsPath('img/[name].[ext]?[hash:7]')
        }
      }]
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1024 * 8,
        name: assetsPath('fonts/[name].[ext]?[hash:7]')
      }
    }],
  },
  optimization: {
    // 将 webpack 生成的 runtime 作为独立 chunk ，runtime 包含在模块交互时，模块所需的加载和解析逻辑（manifest）
    runtimeChunk: 'single',
    // 用于控制压缩的开关，开发环境默认关闭，生产环境默认开启
    // minimize: true,
    // 用于配置 minimizers 和选项
    minimizer: [ 
      // new UglifyJsPlugin({
      //     cache: true,
      //     parallel: true,
      //     sourceMap: true // set to true if you want JS source maps
      // }),
      // 压缩css
      new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { safe: true } })
    ],
    // 用于拆分代码，找到 chunk 中共同依赖的模块,取出来生成单独的 chunk
    /**
     *   chunks: 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
     *   minSize: 表示在压缩前的最小模块大小，默认为30000
     *   minChunks: 表示被引用次数，默认为1
     *   maxAsyncRequests: 按需加载时候最大的并行请求数，默认为5
     *   maxInitialRequests: 一个入口最大的并行请求数，默认为3
     *   automaticNameDelimiter: 命名连接符
     *   name: 拆分出来块的名字，默认由块名和hash值自动生成
     *   cacheGroups: 缓存组。缓存组的属性除上面所有属性外，还有test, priority, reuseExistingChunk
     *    - test: 用于控制哪些模块被这个缓存组匹配到
     *    - priority: 缓存组打包的先后优先级
     *    - reuseExistingChunk: 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块
     */ 
    splitChunks: {
      cacheGroups: {
        chunks: 'async',
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: baseConf.entryTemp,
      // 如果是 true ，会给所有包含的 script 和 css 添加一个唯一的 webpack 编译 hash 值。这对于缓存清除非常有用。
      hash: false,
      // 如果传入 true（默认），错误信息将写入 html 页面
      showErrors: true,
      // 传一个 html-minifier 插件的配置 object 来压缩输出。
      minify: {
        removeRedundantAttributes:true, // 删除多余的属性
        collapseWhitespace:true, // 折叠空白区域
        removeAttributeQuotes: true, // 移除属性的引号
        removeComments: true, // 移除注释
        collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
      },
      // 把所有产出文件注入到给定的 template 或templateContent。
      // 当传入 true 或者 'body' 时所有 javascript 资源将被放置在body 元素的底部，'head' 则会放在 head 元素内。
      inject: true
    })
  ]
}