'use strict'

const path = require('path')
const webpack = require('webpack')
const { base: baseConf } = require('./conf')
const bundleConfig = require('./dll-config.json')
const { getEntry, getOutput, assetsPath, getEnvConf } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// console.log(process.env.NODE_ENV, '<<<') // undefined

module.exports = {
  mode: 'none',
  // entry 和 module.rules.loader 选项相对于context解析
  context: baseConf.context,
  performance: {
    hints: false
  },
  entry: getEntry(),
  output: getOutput(),
  resolve: {
    // 指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
    extensions: ['.js', '.jsx', '.json'],
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
    }]
  },
  plugins: [
    // 不配置任何选项的html-webpack-plugin插件，
    // 会默认将webpack中的entry配置所有入口chunk和extract-text-webpack-plugin抽取的css样式都插入到文件指定的位置
    new HtmlWebpackPlugin({
    /**
     *  1、filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
     *  2、指定生成的html文件内容中的link和script路径是相对于生成目录下的，写路径的时候请写生成目录下的相对路径。
     * */ 
      // filename: '',
      template: baseConf.entryTemp,
      // Adds the given favicon path to the output HTML
      favicon: 'static/img/favicon.ico',
      // 如果是 true ，会给所有包含的 script 和 css 添加一个唯一的 webpack 编译 hash 值。这对于缓存清除非常有用。
      hash: false,
      // 如果传入 true（默认），错误信息将写入 html 页面
      showErrors: true,
      // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的chunk注入到模板中。在配置多个页面时，每个页面注入的chunk应该是不相同的，需要通过该配置为不同页面注入不同的chunk
      // chunks: [],
      //  这个与chunks配置项正好相反，用来配置不允许注入的chunk
      // excludeChunks: [],
      /**
       *  none | auto| function，默认auto； 允许指定的chunk在插入到html文档前进行排序。
       *    - function值可以指定具体排序规则；
       *    - auto基于chunk的id进行排序； 
       *    - none就是不排序
       */
      chunksSortMode: 'none',
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
      inject: true,
      vendorJsName: bundleConfig.vendor.js,
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    new CopyWebpackPlugin([{
      from: {
        glob: 'static/js/*'
      },
      to: getEnvConf().conf.assetsRoot
    }])
  ]
}