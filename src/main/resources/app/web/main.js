import angular from "angular";
import ui_router from '@uirouter/angularjs';

import 'jquery';
//import 'jquery/dist/jquery.js';
//import 'jqueryalias';

import './controller1';

import helloTemplateInlineHtmlTemplate from '../template/helloTemplateInlineHtml.html';

document.getElementById('hello').style.color = "red";

$('#jqueryhello1').css("color", "red");
jQuery('#jqueryhello2').css("color", "blue");
window.jQuery('#jqueryhello3').css("color", "green");



var mainModule = angular.module('F1FeederApp', [
    ui_router,
    'F1FeederApp.controllers'
]);

mainModule.config(function ($stateProvider) {
    var helloTemplate = {
        name: 'helloTemplate',
        url: '/helloTemplate',
        template: '<h3>hello world! inlined template</h3>'
    }

    var helloTemplateURL1 = {
        name: 'helloTemplateURL1',
        url: '/helloTemplateURL1',
        templateUrl: 'hello1.html'
    }

    var helloTemplateURL2 = {
        name: 'helloTemplateURL2',
        url: '/helloTemplateURL2',
        templateUrl: 'hello2.htm'
    }

     var helloTemplateInlineHtml = {
        name: 'helloTemplateInlineHtml',
        url: '/helloTemplateInlineHtml',
        template: helloTemplateInlineHtmlTemplate
    }

    $stateProvider.state(helloTemplate);
    $stateProvider.state(helloTemplateURL1);
    $stateProvider.state(helloTemplateURL2);
    $stateProvider.state(helloTemplateInlineHtml);
});