webpackJsonp([3],{

/***/ 177:
/***/ (function(module, exports) {

angular.module('lazyLoadComponentModule',[])
.component('lazyLoadComponent', {
  bindings: { user: '<' },
  template: ` <h3>User {{ $ctrl.user.id }}</h3>`
})

/***/ })

});