'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const {VueLoaderPlugin} = require('vue-loader')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  performance: {
    maxAssetSize: 100000,
    hints: false
  },
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, '404.html')},
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    openPage: 'login.html',
    index:'login.html',
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        ta404: {
          chunks: 'all',
          name: 'vendor',
          test: (module) => {
            return /node_modules\/.*ta404-ui/.test(module.context) ||
              /node_modules\/.*vue\/dist/.test(module.context) ||
              /node_modules\/.*sockjs-client\/dist/.test(module.context) ||
              /node_modules\/.*vue-router\/dist/.test(module.context)
          },
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100
        },
        common: {
          chunks: 'all',
          name: 'common',
          test: (module) => {
            return /[\\/]node_modules[\\/]/.test(module.context)
          },
          minChunks: 10,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 10
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: config.dev.autoOpenBrowserWithAnalyzer
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
  ].concat(utils.htmlPlugin())// 添加html多模块打包出口
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`系统访问地址: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

console.error([
  '888888  db          dP88   dPYb     dP88',
  '  88   dPYb        dP 88  dP   Yb  dP 88',
  '  88  dP__Yb      d888888 Yb   dP d888888',
  '  88 dP    Yb         88   YbodP      88'
].join('\n'))
console.warn([
  '                   _ooOoo_',
  '                  o8888888o',
  '                  88" . "88',
  '                  (| -_- |)',
  '                  O\\  =  /O',
  "               ____/`---'\\____",
  "             .'  \\\\|     |//  `.",
  '            /  \\\\|||  :  |||//  \\',
  '           /  _||||| -:- |||||-  \\',
  '           |   | \\\\\\  -  /// |   |',
  "           | \\_|  ''\\---/''  |   |",
  '           \\  .-\\__  `-`  ___/-. /',
  "         ___`. .'  /--.--\\  `. . __",
  "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
  '     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |',
  '     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /',
  "======`-.____`-.___\\_____/___.-`____.-'======",
  "                   `=---='",
  '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
  '         佛祖保佑       永无BUG'
].join('\n'))
