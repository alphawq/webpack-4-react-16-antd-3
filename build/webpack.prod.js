const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const { assetsPath } = require('./utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const NyanProgressPlugin = require('nyan-progress-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

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
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
              plugins: () => [
                  require('autoprefixer')
              ],
              sourceMap: true
          }
        },
        {
          loader: 'less-loader',
          options: {
            /**
             * to fix antd引入样式文件报错
             * https://stackoverflow.com/questions/46729091/enable-inline-javascript-in-less
             * */ 
            javascriptEnabled: true,
            //  自定义antd主题色
            modifyVars: { "@primary-color": "#34bb8e" }
          }
        }],
      }
    ]
  },
  optimization: {
    // 将 webpack 生成的 runtime 作为独立 chunk ，runtime 包含在模块交互时，模块所需的加载和解析逻辑（manifest）
    // runtimeChunk: 'single',
    // 用于控制压缩的开关，开发环境默认关闭，生产环境默认开启
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
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        }
      })
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
        vendor: {
          // 打包所有来自node_modules中的公共模块。RegExp、String和Function三种类型
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'async'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: process.cwd() }),
    // 参见【缓存】章节 https://webpack.docschina.org/guides/caching
    new webpack.HashedModuleIdsPlugin(),
    // MiniCssExtractPlugin
    new MiniCssExtractPlugin({
      filename: assetsPath('css/app.css?[contenthash:7]'),
      // chunkFileName: assetsPath('css/[id].[contenthash:7].css')
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
          discardComments: { removeAll: true },
          // 避免 cssnano 重新计算 z-index
          safe: true,
          // cssnano 集成了autoprefixer的功能
          // 会使用到autoprefixer进行无关前缀的清理
          // 关闭autoprefixer功能
          // 使用postcss的autoprefixer功能
          autoprefixer: false
      },
      canPrint: true
    }),
    new NyanProgressPlugin({
      // 获取进度的时间间隔，默认 180 ms
      debounceInterval: 60,
      nyanCatSays (progress, messages) {
        if (progress === 1) {
          // 当构建完成时，喊出「呦，又在写 Bug 了？」
          return '呦, 又在写 Bug 了?'
        }
      }
    })
  ]
})