angular.module('usingbundleloaderModule',[])
.component('usingbundleloaderComponent', {
  bindings: { user: '<' },
  template: ` <h3>User usingbundleloaderModule {{ $ctrl.user.id }}</h3>`
})