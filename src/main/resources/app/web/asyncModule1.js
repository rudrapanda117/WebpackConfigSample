var asyncModule1 = angular.module('asyncModule1',[]);

asyncModule1.controller('asyncController1',['$scope',function(scope){
this.demoModel="async Model controller1";

this.greetUser = GREETUSER;
    console.log('GREETUSER', GREETUSER);
}])