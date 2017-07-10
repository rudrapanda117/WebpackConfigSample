import angular from "angular";
import ui_router from '@uirouter/angularjs';

import  'jquery';
//import 'jquery/dist/jquery.js';
//import 'jqueryalias';

import './controller1';

document.getElementById('hello').style.color="red";

$('#jqueryhello1').css("color", "red");
jQuery('#jqueryhello2').css("color", "blue");
window.jQuery('#jqueryhello3').css("color", "green");



var mainModule=angular.module('F1FeederApp', [
    ui_router,
  'F1FeederApp.controllers'
]);

mainModule.config(function($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>hello world!</h3>'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});