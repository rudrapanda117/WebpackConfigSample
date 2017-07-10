var asyncModule1 = angular.module('asyncModule1',[]);

asyncModule1.controller('asyncController1',['$scope',function(scope){
scope.demoModel="async Model controller1"
}])