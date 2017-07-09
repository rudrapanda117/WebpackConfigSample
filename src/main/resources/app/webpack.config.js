var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');



const buildPath = '../static/app/dist'

module.exports = {

  entry: {
    app: ['./web/main.js'],
    vendor: ['angular', 'jquery'] //jqueryalias
  },
  output: {
    filename: 'js/[name].bundle.js', // do not use hash in developement mode as old files are not removed and it may lead to memmory shortage
    path: path.join(__dirname, buildPath),
    publicPath: '/WebpackConfigSample/app/dist/'
  },
  devServer: {
    //contentBase: __dirname + '/template',
    port: 8445,
    //publicPath:'/'
    // proxy:{
    //   "*":"http://localhost:8181/"
    // }  
  },
  resolve: {
    //extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      jqueryalias: __dirname + "/node_modules/jquery/dist/jquery.js"
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      template: './template/index.html',
      // hash:true // do not use hash in developement mode as old files are not removed and it may lead to memmory shortage
    }),
    // new CleanWebpackPlugin(['../static/app'])  // cannot be used as the destination is outside the project root instead use rimraf

    //https://stackoverflow.com/questions/30329337/how-to-bundle-vendor-scripts-separately-and-require-them-as-needed-with-webpack
    //Third Party library are repeated in app and vendor bundle
    //https://stackoverflow.com/questions/43287290/webpack-2-vendor-bundle
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   //filename: "js/vendor.bundle.js",
    //   chunks: ['app','vendor'], // Select the source chunks by chunk names. The chunk must be a child of the commons chunk.// If omitted all entry chunks are selected.
           
    // }),
  ]
}