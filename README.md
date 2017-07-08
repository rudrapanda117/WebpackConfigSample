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

