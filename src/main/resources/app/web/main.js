import angular from "angular";

import  'jquery';
//import 'jquery/dist/jquery.js';
//import 'jqueryalias';

document.getElementById('hello').style.color="red";

$('#jqueryhello1').css("color", "red");
jQuery('#jqueryhello2').css("color", "blue");
window.jQuery('#jqueryhello3').css("color", "green");

angular.module('F1FeederApp.controllers', []).
controller('driversController', function($scope) {
    $scope.driversList = [
      {
          Driver: {
              givenName: 'Sebastian',
              familyName: 'Vettel'
          },
          points: 322,
          nationality: "German",
          Constructors: [
              {name: "Red Bull"}
          ]
      },
      {
          Driver: {
          givenName: 'Fernando',
              familyName: 'Alonso'
          },
          points: 207,
          nationality: "Spanish",
          Constructors: [
              {name: "Ferrari"}
          ]
      }
    ];
});

angular.module('F1FeederApp', [
  'F1FeederApp.controllers'
]);