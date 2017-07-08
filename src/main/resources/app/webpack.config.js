var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');

const buildPath = 'dist'

module.exports = {

  entry: {
    bundle: ['./web/main.js']
  },
  output: {
    filename: 'js/bundle.js',
    path: path.join(__dirname, buildPath)
    
  },
  devServer: {
    //contentBase: __dirname + '/web',
    port: 8445  
  },
  plugins: [
        new HtmlWebpackPlugin({
            template: './web/index.html', 
        })
  ]
}