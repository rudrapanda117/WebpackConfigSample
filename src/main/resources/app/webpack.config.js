var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');

const buildPath = '../static/app/dist'

module.exports = {

  entry: {
    bundle: ['./web/main.js']
  },
  output: {
    filename: 'js/bundle.js',
    path: path.join(__dirname, buildPath),
    publicPath:'/WebpackConfigSample/app/dist/'
  },
  devServer: {
    //contentBase: __dirname + '/template',
    port: 8445,
    //publicPath:'/'
    // proxy:{
    //   "*":"http://localhost:8181/"
    // }  
  },
  plugins: [
        new HtmlWebpackPlugin({
            template: './template/index.html', 
        })
  ]
}