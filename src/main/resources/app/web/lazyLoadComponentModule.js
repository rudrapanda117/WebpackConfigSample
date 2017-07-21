angular.module('lazyLoadComponentModule',[])
.component('lazyLoadComponent', {
  bindings: { user: '<' },
  template: ` <h3>User {{ $ctrl.user.id }}</h3>`
})