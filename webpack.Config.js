const resolve = require('path').resolve
// const resolve = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
  entry: {
    // vendor: './src/vendor',
    index: ['babel-polyfill', './src/main.js']
  },
  output: {
    // path: resolve(__dirname, 'dist'),
    path:resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use:[
          'style-loader', 
          'css-loader', 
          'postcss-loader'    
        ]
      },
      {
        test: /\.styl$/,
        use: [
          // 用了vue-style-loader才支持css热更替
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              // config: {
              //   path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
              // }
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({ //使用JQ
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  resolve: {
    alias: {
      // '~': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
      'stylus': resolve(__dirname, 'src/assets/stylus'),
      'views': resolve(__dirname, 'src/views')
    },
        // 别名,方便引入时使用
        // alias: {
        //   '@': resolve.join(__dirname, '../src'),
        //   'stylus': resolve.join(__dirname, '../src/assets/stylus'),
        //   'views': resolve.join(__dirname, '../src/views')
        // },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devServer: {
    host: '127.0.0.1',
    port: 80,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:80',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    },
    disableHostCheck: true,//解决127.0.0.1指向其他域名时出现"Invalid Host header"问题
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
