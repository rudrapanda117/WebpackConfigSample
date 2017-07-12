WebpackConfigSample
"# WebpackConfigSample" 

Observations 

1. Difference between Gradle and eclipse build path
The bin folder is created by eclipse and used as a build output when the project is build from eclipse instead of gradle CLI.
In turn this is used for lunching spring boot , when you run from Run as -> Spring Boot App

https://discuss.gradle.org/t/eclipse-plugin-did-not-configure-default-output-directory-to-build/7586/7

2. Devserver setup
 a) Usage of contentbase in devserver config
 Checkout tag 4-devserver_setup_with_contentbase
		When webpack-dev-server is set up , it can only serve those contents which are build by webpack like js or
		 css files doen the file hierarchy from the entry js file .
		when http://localhost:8445 is hit it first ask for the index.html .
		 This file cannot be served by webpack as it is not in the file hirarchy.
		So to serve the first index.html , we have to mention contentBase in the devserver config.
		contentBase: __dirname + '/web' . Here /web is the folder where index.html is residing.
		If we use contentbase , then in index.html we have to manually inject the js file like <script src="js/bundle.js"></script>.
b) Usage of HtmlWebpackPlugin instead of contentbase
Checkout tag 5-devserver_setup_with_HtmlWebpackPlugin
When webpack-dev-server is set up , it can only serve those contents which are build by webpack like js or
		 css files doen the file hierarchy from the entry js file .
		 If we use HtmlWebpackPlugin , then it injects the index.html to file list held by webpack .
		 So webpack devserver can serve index.html without specifically being told where to serve from(contentbase)


3) Setting up Proxy for dev server
first bundle the js through webpack command.
HtmlWebpackPlugin would include the js bundle automatically.
First provide publicPath in webconfig value of '/WebpackConfigSample/app/dist/'
How to decide what should go in public path.
First set up the backend index.html and corresponding script tag 
 <script type="text/javascript" src="/WebpackConfigSample/app/dist/js/bundle.js"></script></body>
Here the index.html will be served from template when call is for http://localhost:8181/WebpackConfigSample/hello.htm.
This in turn call script bundle.js.
This file resides in static/app/dist.
In spring boot static files are served from static / public folder automatically.
So app/dist is where the front end generated js and css after building and bundling are copied to .
We can have something else also instead of app/dist , so  we have to change the script in index.html <script type="text/javascript" src="/WebpackConfigSample/app/dist/js/bundle.js"></script></body> as <script type="text/javascript" src="/WebpackConfigSample/otherFolder/bundle.js"></script></body>

This WebpackConfigSample is the context and app/dist is the folder where all the js and css (also images and fonts) resides.

so for production every js and image and font file should be addressed with  /WebpackConfigSample/app/dist/ in index.html
This becomes the publicPath , as HtmlWebpackPlucgin will prefix js , images ,css and fonts with publicPath.

This is helpful when running devserver ,it keeps the same static folder address while in development as was in production.

Copy the generated index.html to template folder and rest to app/dist of bin folder or build folder  for production mode.
In development mode only copy the generated index.html .
Rest will be automatically served from devserver.

set Proxy to 

proxy:{
      "*":"http://localhost:8181/"
    } 
    
    So when call goes to http://localhost:8445/WebpackConfigSample/hello.htm 
    it is directed to http://localhost:8181/WebpackConfigSample/hello.htm as this cannot be served by devserver .
    After that all the js will be served by devserver as it has the js generated with in.
    
    
    This is helpfull when you only want to call backend for REST service while the front end is served by devserver for quick UI changes in js .
    
    Changes to css and js will only reflect . For changes to html you have to generate again and restart the backend server after coping index.html to war file .
  
  4) Devserver with proxy off
  just comment out proxy settings in webconfig
  Let the publicPath be same as before .
  Now index.html generated will be access by http://localhost:8445/WebpackConfigSample/app/dist/
  
  WebpackConfigSample/app/dist/ is the publicPath under which generated js,html , css and font is available.
  if publicPath is made to / then http://localhost:8445/ .
  
  Other wise webpack dev server searches for index.html which it does not find and shows the directory folder .

5) Separating vendor bundle for third party js
tag 10-Separating_vendor_bundle

6) Hashing for cache busting 
This is useful in production as it clears the cache .
But in development mode this leads to memory issue as old files are not removed.

7) Adding third party library Jquery
Tag 11-Adding_JQuery

npm install --save jquery
Add jquery to vendor list  vendor: ['angular', 'jquery'] //jqueryalias

import 'jquery'
use provideplugin to expose the jquery to global
Jquery is a library which works by exposing $ or JQuery variable to global scope.
So when you import the library the $ is not set to global scope instead it remains inside the module where you have imported.
To expose it to global scope , use provide plugin .

We can import jquery by mentioniung the complete path like import 'jquery/dist/jquery.js';
Again these paths tend to become larger for importing individual js files.
So we will use aliases to represent these paths 

alias: {
      jqueryalias: __dirname + "/node_modules/jquery/dist/jquery.js"
    }
Now we can use import 'jqueryalias'; statement to import jquery . This helps in maintaining individual library js files .

8) Separate common modules
Tag 12-Commons_Chunks_Plugin
after adding jquery and angular library you will observe that these library are repeated in both app.bundle.js and vendor.bundle.js
This is because you have imported into main.js and that goes into app.bundle.js
Also you have inclided those in vendor list .
So the repeatations.
To avoid this kind of issues we have to use commonchunks plugin , which checks common code between mentioned chunks and remove them to separate chunks.

If the name of common chunk is not existing chunk like vendor (chunk name is thirdparty) , then vendor.bundle.js will be empty.
So in the end vendor.bundle.js will be create which will be empty (depends) and thirdparty.js will be created which will have all the third party libraries.

Automatic chunk separation
Mentioning chunks manually in vendor chunks and then in common chunks can be taxing , but to automate the separation such that any third party library will be automatically moved to vendor chunk
 new webpack.optimize.CommonsChunkPlugin({
              name: 'vendor',
              minChunks: function(module, count) {
                console.log(module.resource);
                  return module.resource && module.resource.indexOf(path.resolve(__dirname, 'web')) === -1;
              }
          }),
          
          
  This will move all the js or css or any resources outside the web folder and refrenced in main.js will automatically moved to vendor chunk.  
  
  9) Provide Plugin
  Tag 13-Provide_Plugin
  Whenever the identifier is encountered as free variable in a module, the module is loaded automatically 
    and the identifier is filled with the exports of the loaded module (of property in order to support named exports).
   let expression = `require(${JSON.stringify(request[0])})`;
   https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack      
   
   Why providePlugin is used for Jquery but not for angular ?
   This depends on how the angular and JQuery are exposed to global scope i.e window.
  
   if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	 For JQuery above code exposes JQuery to window which is by default turned off as noGlobal is true.
	module.exports = global.document ?
			factory( global, true ) :  here noGlobal is set as true 
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}
 
 So in ProvidePlugin 
 $:'jquery'  translate to window.$=require('jquery')
 This loads the jquery from node module , runs the IIFE and assigns the jquery function in module.export to Window.$.
 
 
 
 For angular
 
 Window is passed to IIFE explicitly .
 
 10) Ui router set up 
 Create hello1.html in static/app/dist folder .for this url should be http://localhost:8445/WebpackConfigSample/app/dist/hello1.html
 Create hello1.html in static folder .for this url should be http://localhost:8445/WebpackConfigSample/hello1.html
 
 11) Using Html Loader to inline Html files
 Tag 15-Html-Loader
 This loader converts the html to string and can be used as template instead of template url .
 This also handles the images gives image loader are also present .
 
 12) Lazy loading
 Tag 16-Lazy_Loading_and_code_splitting
 https://oclazyload.readme.io/docs/webpack
 https://github.com/ocombe/ocLazyLoad/tree/master/examples
 https://michalzalecki.com/lazy-load-angularjs-with-webpack/
 	You need both ocLazyLoad and RequireJS because with you now deal with two separate module concepts - your javascript modules and the angular internal modules.

After the initial bootstrap, angularjs doesn't allow registering new modules and components like directives and controllers anymore (at least not using the standard way).

RequireJS only loads javascript files but it doesn't register the new angular modules and components in this new code

What ocLazyLoad does is to allow you to load your additional files using a third party module loader like RequireJS and the more important thing - it registers in angular the new modules and components in the lazily loaded code.

In summary - you can lazily load code using only RequireJS, but you can't load angular modules and components only using RequireJS. There is a need for extra work, like this performed by ocLazyLoad.

It allows you to separate different areas of your app into different physical bundles, the loading of which will be deferred until the associated route set up with ui-router is initially resolved. This allows you to maintain a single app structure without loading all modules up front. The primary motivation is performance, but it also has security implications because if the user is not authorized to access a route corresponding to a separate bundle, the code for that bundle may not even be loaded from the server.

By Default you create traditional in file module by creating a file anf writing a IIFE in it which will run the angular code for registering component and controllerss or directives.
This file is then added to script tag.

OcLazyLoad :
For Lazy Load of angular component , we should not add our component registering in IIFE , instead just write them in file and and them to script tag.
So these components are not registered in angular bootstrap.Also angular does not allow registering component after bootstrap .
To do so you have to tap into core api of angular.

OcLazyLoad is an library to facilitate loading of angular component after bootstrapping of angular component.

Webpack Dynamic Import:
For Lazy loading the files (asynchronously module loading) same as AMD implementation like require.js .
Webpack provide these lazy or dynamic loading with require.ensure or import().
We can use require.ensure and import for loading files by having filename mentioned already or decide filename in runtime.
We should avoid deciding filename at runtime as it takes the all the files in the folder and convert them to chunks.

This also needs code splitting or chunking config in webpack config as chunkfile
chunkFilename: '[name].js'
If this is not set chunk name is set to number like 1.js

import(/* webpackChunkName: "asyncModule1" */ './asyncModule1')


require.ensure([], function(require) {
                                require('./asyncModule2');

                                $ocLazyLoad.load({
                                    name: moduleName,
                                });

                                deferred.resolve(angular.module(moduleName).controller);
                            }, 'asyncModule2'); //naming chunkfiles
                            

LazyLoading Html Template
 Tag 17-Lazy_loading_html_templates
  templateProvider: ($q) => {
            return $q((resolve) => {
                // lazy load the view
                require.ensure([], () => resolve(require('../template/lazyLoadingTemplate.html')),'lazyLoadingTemplateHtml');
            });
        } 
        
  Dynamic Imports
  Tag 18-Dynamic_Import
  var imported= import ( /* webpackChunkName: "asyncModule1" */ './asyncModule1');
              imported.then(function () {
                    $ocLazyLoad.load({
                        name: moduleName,
                    });

                    deferred.resolve(angular.module(moduleName).controller);
                }); 
  Dynamic Importing Angular component
  Tag 19-Dynamic_importing_Component
  
  Instead of using controller , use component and also lazy load the component .
  
  Using Bundle Loader
  Tag 20-Using_Bundle_Loader
 
 https://stackoverflow.com/questions/40763870/require-multiple-files-dynamically-using-webpack-bundle-loader
                    
   with bundle loader
   var load = require("bundle-loader?lazy&name=usingbundleloaderModule!./usingbundleloaderModule.js");
                load(function (file) {
                    //require('./usingbundleloaderModule');

                    $ocLazyLoad.load({
                        name: moduleName,
                    });

                    deferred.resolve(angular.module(moduleName).component);
                });                 
                    
   with Promise loader
    var load = require("promise-loader?bluebird,usingbundleloaderModule!./usingbundleloaderModule.js");
                load().then(function (file) {
                    //require('./usingbundleloaderModule');

                    $ocLazyLoad.load({
                        name: moduleName,
                    });

                    deferred.resolve(angular.module(moduleName).component);
                });        
                
  13 ) Image Loader
  Tag 21-Image_Loader
  For image loader we use file loader and url loader.
  File loader is used to deal with image as a file .
  To deal with images in html templates we have html loader which converts the html to string .
  This also resolves the images also .
  If we see the generated webpack code 
  every image src <img src="../img/png/Home-icon20.png"> loaded by file loader is converted to 
  /***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/img/png/Home-icon6.png";

/***/ })      
Here    __webpack_require__.p points to public path which we have set to /WebpackConfigSample/app/dist.
Since images are static , they cannot be served under /WebpackConfigSample/app/dist/ path. 
So when we access http://localhost:8445/WebpackConfigSample/app/dist/img/png/img/png/Home-icon6.png , it will give 404 in dev server.
This is because images are served under  http://localhost:8445/img/png/img/png/Home-icon6.png  .
That is default publicpath which point to root folder /app.
So to make this work without proxy we have to point the public path to default  .We have to omit public path.
Not publicPath :'/'. This loades images from http://img/png/Home-icon5.png.
Wen we omit public path , it points to /app the root folder . http://localhost:8445/img/png/Home-icon8.png

But without publicpath and publicpath pointing to / webpack dev server shows "webpack output is served from /"

Ommiting the public path , also makes the generated assests like js and css bundle also served under root folder from dev server memory . 

To work with publicpath   /WebpackConfigSample/app/dist , we have to turn on the proxy and put the images under static/app/dist folder .
Because under /WebpackConfigSample/app/dist images are not available , so dev server forwards this request to the original server where images are served from app/dist folder.

Url loader converts the image to data scheme with base64 encoding and returns  DataURL     .
So the whole image is converted to inlined base64 code .
This leads to faster loading of images
 {
        test: /\.(jpg)$/,
        use: 'url-loader?limit=8192&name=[path][name].[ext]'
      }
      Any jpg images encontered invoke url loader , if the size is less than 8192 convert the image to dataUrl otherwise if the size is greater invoke file loader to handle the image and copy the image to /app/dist folder with name as [path][name].[ext] .
      We can mention the [hash] for cache busting also.
      
      Click Ui-router with sync Module to see the jpg images loading faster ass they are inlined .
      The png images which are copied to dist folder using file loader are loaded slowly.
      This is because browser can make 5 request parallel at a given time.  
      
 14) Style Loaders
 Tag 22-Style_CSS_SASS_Loaders
 this loader consist of three loaders style loader, css loader and sass loader.
 style-loader" -> creates style nodes from JS strings 
 css-loader" -> translates CSS into CommonJS    
 sass-loader" -> compiles Sass to CSS       