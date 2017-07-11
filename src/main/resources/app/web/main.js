import angular from "angular";
import ui_router from '@uirouter/angularjs';
import './oclazyload';

import 'jquery';
//import 'jquery/dist/jquery.js';
//import 'jqueryalias';

import './controller1';

import './syncModule';

import helloTemplateInlineHtmlTemplate from '../template/helloTemplateInlineHtml.html';
import syncModuleControllerTemplate from '../template/syncModuleControllerTemplate.html';
import asyncModuleControllerTemplate1 from '../template/asyncModuleControllerTemplate.1.html';
import asyncModuleControllerTemplate2 from '../template/asyncModuleControllerTemplate.2.html';



document.getElementById('hello').style.color = "red";

$('#jqueryhello1').css("color", "red");
jQuery('#jqueryhello2').css("color", "blue");
window.jQuery('#jqueryhello3').css("color", "green");



var mainModule = angular.module('F1FeederApp', [
    ui_router, 'syncModule', 'oc.lazyLoad',
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

    var syncModuleController = {
        name: 'syncModuleController',
        url: '/syncModuleController',
        template: syncModuleControllerTemplate,
        controller: 'syncController as smc',
        // resolve: {
        // syncModuleResolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        //                     var deferred = $q.defer();
        //                     var moduleName = 'syncModule';
        //                     require.ensure([], function(require) {
        //                         require('./syncModule');

        //                         $ocLazyLoad.load({
        //                             name: moduleName,
        //                         });

        //                         deferred.resolve(angular.module(moduleName).controller);
        //                     }, 'syncModule'); //naming chunkfiles

        //                     return deferred.promise;
        //                 }]
        // }
    }

    var asyncModuleController1 = {
        name: 'asyncController1',
        url: '/asyncController1',
        template: asyncModuleControllerTemplate1,
        controller: 'asyncController1 as asmc1',
        resolve: {
            syncModuleResolve: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                var moduleName = 'asyncModule1';

                require.ensure([], function (require) {
                    require('./asyncModule1');

                    $ocLazyLoad.load({
                        name: moduleName,
                    });

                    deferred.resolve(angular.module(moduleName).controller);
                }, 'asyncModule1'); //naming chunkfiles

                var imported =
                    import ( /* webpackChunkName: "asyncModule1" */ './asyncModule1');
                imported.then(function () {
                    $ocLazyLoad.load({
                        name: moduleName,
                    });

                    deferred.resolve(angular.module(moduleName).controller);
                });

                return deferred.promise;
            }]
        }
    };

    var asyncModuleController2 = {
        name: 'asyncController2',
        url: '/asyncController2',
        template: asyncModuleControllerTemplate2,
        controller: 'asyncController2 as asmc2',
        resolve: {
            syncModuleResolve: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                var moduleName = 'asyncModule2';
                require.ensure([], function (require) {
                    require('./asyncModule2');

                    $ocLazyLoad.load({
                        name: moduleName,
                    });

                    deferred.resolve(angular.module(moduleName).controller);
                }, 'asyncModule2'); //naming chunkfiles

                return deferred.promise;
            }]
        }
    }



    var lazyLoadingTemplate = {
        name: 'lazyLoadingTemplate',
        url: '/lazyLoadingTemplate',
        templateProvider: ($q) => {
            return $q((resolve) => {
                // lazy load the view
                require.ensure([], () => resolve(require('../template/lazyLoadingTemplate.html')), 'lazyLoadingTemplateHtml');
            });
        },
        controller: 'lazyLoadingTemplateController as ltt',
        resolve: {
            lazyLoadingTemplateController: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                var moduleName = 'lazyLoadingTemplateModule';
                require.ensure([], function (require) {
                    require('./lazyLoadingTemplateModule');

                    $ocLazyLoad.load({
                        name: moduleName,
                    });

                    deferred.resolve(angular.module(moduleName).controller);
                }, 'lazyLoadingTemplateModule'); //naming chunkfiles

                return deferred.promise;
            }]
        }
    }

    var lazyLoadComponentModule= {
        name:'lazyLoadComponentModule',
        url: '/lazyLoadComponentModule',
        component: 'lazyLoadComponent',
        resolve: {
            user: function () {
                return {
                    id: 'qwerty'
                };
            },
            lazyLoadComponent: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
                var deferred = $q.defer();
                var moduleName = 'lazyLoadComponentModule';
                require.ensure([], function (require) {
                    require('./lazyLoadComponentModule');

                    $ocLazyLoad.load({
                        name: moduleName,
                    });

                    deferred.resolve(angular.module(moduleName).component);
                }, 'lazyLoadComponentModule'); //naming chunkfiles

                return deferred.promise;
            }]
        }
    };


    $stateProvider.state(helloTemplate);
    $stateProvider.state(helloTemplateURL1);
    $stateProvider.state(helloTemplateURL2);
    $stateProvider.state(helloTemplateInlineHtml);
    $stateProvider.state(syncModuleController);
    $stateProvider.state(asyncModuleController1);
    $stateProvider.state(asyncModuleController2);

    $stateProvider.state(lazyLoadingTemplate);

    $stateProvider.state(lazyLoadComponentModule);
});