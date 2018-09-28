const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const resolve = require('./utils').resolve(__dirname)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(base, {
  /**
   *  mode: 'development'
   *  - 会将 process.env.NODE_ENV 的值设为 development。
   *  - 启用 NamedChunksPlugin 和 NamedModulesPlugin。
   * */ 
  mode: 'development',
  // 此选项控制是否生成，以及如何生成 source map.
  // 不同的值会明显影响到构建(build)和重新构建(rebuild)的速度
  // 参见 -【https://juejin.im/post/58293502a0bb9f005767ba2f】
  // 【https://webpack.docschina.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx】
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [resolve('../src'),resolve('../static/css')],
        loader: ['style-loader', 'css-loader']
      }, {
        test: /\.less$/,
        include: [resolve('../src'),resolve('../static/css')],
        use: ['style-loader', 'css-loader', {
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
          }
        ]
      }
    ]
  },
  plugins: [
    /**
     *  利用浏览器缓存
     * 
     * webpack 处理模块(module)间依赖关系时，需要给各个模块定一个 id 以作标识。
     * webpack 默认的 id 命名规则是根据模块引入的顺序，赋予一个整数(1、2、3……)。
     * 当你在源码中任意增添或删减一个模块的依赖，都会对整个id 序列造成极大的影响，
     * 可谓是“牵一发而动全身”了。那么这对我们的浏览器缓存会有什么样直接的影响呢？
     * 影响就是会造成，各个chunk中都不一定有实质的变化，但引用的依赖模块id却都变了，
     * 这明显就会造成 chunk 的文件名的变动，从而影响浏览器缓存。
     * / 
     

    /**
     *  原理：直接使用模块的相对路径作为模块的 id，这样只要模块的相对路径不变，模块 id 也就不会变了
     *  弊端：由于模块的相对路径有可能会很长，那么就会占用大量的空间
     *  开发环境一般都是禁用缓存的，所以在开发环境，一般不用这个插件。
     *  生产环境，推荐使用 【HashedModuleIdsPlugin】
     *  mode: development 会默认启用该插件
     */ 
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin()
  ]
})