var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');



const buildPath = '../static/app/dist'

module.exports = {

  entry: {
    app: ['./web/main.js'],
    vendor: ['angular', 'jqueryalias'] //jqueryalias
  },
  output: {
    filename: 'js/[name].bundle.js', // do not use hash in developement mode as old files are not removed and it may lead to memmory shortage
    path: path.join(__dirname, buildPath),
    // publicPath: '/WebpackConfigSample/app/dist',
    //publicPath: '/WebpackConfigSample',
    // publicPath: '/',
    //omit publipath for testing images or static assets
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }],
      },
      {
        test: /\.(png)$/,
        use: ['file-loader?name=/img/png/[name].[ext]']
      }, {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        use: ['file-loader?name=/img/[name].[ext]']
      }, {
        test: /\.(jpg)$/,
        use: 'url-loader?limit=8192&name=[path][name].[ext]'
      },
      // {
      //   test: /\.scss$/,
      //   use: [{
      //     loader: "style-loader" // creates style nodes from JS strings
      //   }, {
      //     loader: "css-loader" // translates CSS into CommonJS
      //   }, {
      //     loader: "sass-loader" // compiles Sass to CSS
      //   }]
      // },
      // {
      //   test: /\.css$/,
      //   use: [{
      //     loader: "style-loader" // creates style nodes from JS strings
      //   }, {
      //     loader: "css-loader" // translates CSS into CommonJS
      //   }]
      // }
{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',//creates style nodes from JS strings
          use:[          
           "css-loader" // translates CSS into CommonJS
            ,
          "sass-loader" // compiles Sass to CSS
        ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
          "css-loader" // translates CSS into CommonJS
         ]
        })
      }
    ]
  },
  devServer: {
    //contentBase: __dirname + '/template', // for templates
   // contentBase: __dirname + buildPath, // for images
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
    //Whenever the identifier is encountered as free variable in a module, the module is loaded automatically 
    // and the identifier is filled with the exports of the loaded module (of property in order to support named exports).
    //let expression = `require(${JSON.stringify(request[0])})`;
    //https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery" // Important as this is used by angular to determine wheter to use JQlite or Jquery
    }),

    new HtmlWebpackPlugin({
      //template: './template/index.1.ejs',
      template: './template/index.html',
      // hash:true // do not use hash in developement mode as old files are not removed and it may lead to memmory shortage
    }),
    // new CleanWebpackPlugin(['../static/app'])  // cannot be used as the destination is outside the project root instead use rimraf

    //https://stackoverflow.com/questions/30329337/how-to-bundle-vendor-scripts-separately-and-require-them-as-needed-with-webpack
    //Third Party library are repeated in app and vendor bundle
    //https://stackoverflow.com/questions/43287290/webpack-2-vendor-bundle
    //Manual vendor separation
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      //name: "thirdparty", //mandatory name of this common chunks. Can take existing chunk like vendor.
      // If name is thirdparty then vendor.js will be empty and all the thirdparty library will be moved to thirdparty.js.
      // filename: "js/a.js", // if turned on the file name should not be same as anyof the existing chunk name.
      // Select the source chunks by chunk names. The chunk must be a child of the commons chunk.
      // If omitted all entry chunks are selected.
      chunks: ['app', 'vendor']
    }),
    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    //  new webpack.optimize.CommonsChunkPlugin({
    //           name: 'vendor',
    //           minChunks: function(module, count) {
    //             console.log(module.resource);
    //               return module.resource && module.resource.indexOf(path.resolve(__dirname, 'web')) === -1;
    //           }
    //       }),
    new ExtractTextPlugin("styles/styles.css")
  ]
}