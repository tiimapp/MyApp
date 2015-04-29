// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'starter.controllers', 'ngCookies', 'ngResource'])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

          .state('loginState', {
              url: '/login',
              cache: false,
              templateUrl: '/templates/loginpage.html',
              controller: 'loginCtrl'

          })
         // setup an abstract state for the tabs directive
          .state('tab', {
              url: "/tab",
              // abstract: true,
              templateUrl: "/templates/tabs.html"
          })
         // Each tab has its own nav history stack:
         .state('tab.NSD', {
             url: '/NSD',
             views: {
                 'tab-NSD': {
                     templateUrl: 'templates/tab-NSD.html',
                     controller: 'NSDCtrl'
                 }
             }
         })
          .state('tab.average', {
              url: '/average',
              abstract:true,
              //cache: true,
              views: {
                  'tab-average': {
                      templateUrl: 'templates/tab-average.html',
                      controller: 'AverageCtrl'
                  }
              }
          })
            .state('tab.average.Detail', {
                url: '/averageDetail',
                //abstract: true,
                //cache: true,
                views: {
                    'tab-averageDetail': {
                        templateUrl: 'templates/tab-averageDetail.html',
                        controller: 'AverageDetailCtrl'
                    }
                }
            })
           .state('tab.contest', {
               url: '/contest',
               cache: false,
               views: {
                   'tab-contest': {
                       templateUrl: 'templates/tab-contest.html',
                       controller: 'ContestCtrl'
                   }
               }
           })
          .state('tab.my', {
              url: '/my',
              views: {
                  'tab-my': {
                      templateUrl: 'templates/tab-my.html',
                      controller: 'MyCtrl'
                  }
              }
          })
        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });


