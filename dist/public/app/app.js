'use strict';

angular.module('fdjApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'highcharts-ng',
  'vs-repeat'  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
 var confDatabase = require('./databaseMySQL.js');
console.log(confDatabase)