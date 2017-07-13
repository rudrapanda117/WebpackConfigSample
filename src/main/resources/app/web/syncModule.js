var syncModule = angular.module('syncModule', []);

syncModule.controller('syncController', ['$scope', function (scope) {
    this.xyz={};
    this.xyz.demoModel = "sync Model controller";

   this.greetUser = GREETUSER;
    console.log('GREETUSER', GREETUSER);
    
}])