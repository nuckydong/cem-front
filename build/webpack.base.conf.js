'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: utils.entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    chunkFilename: 'chunk/[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.js',
      '@': resolve('src'),
      // 添加读取路径
      'pages': resolve('src/pages'),
      'common': resolve('src/common'),
      'faceConfig': resolve('faceConfig.js'),

      '@common': resolve('src/common'),
      '@projectCommon': resolve('src/projectCommon')
    },
    modules: [
      'node_modules',
      'node_modules/@yh'
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client'), resolve('node_modules/vue-echarts-v3/src'), resolve('.'), resolve('node_modules/@yh/ta404-ui'), resolve('node_modules/element-ui'), resolve('node_modules/vue')],
        exclude: [resolve('node_modules'), resolve('build'), resolve('config'), resolve('devGuide')],
        options: config.babel
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin()
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
