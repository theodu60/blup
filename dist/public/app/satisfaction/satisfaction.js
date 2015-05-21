'use strict';

angular.module('fdjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('satisfaction', {
        url: '/satisfaction',
        templateUrl: 'app/satisfaction/satisfaction.html',
        controller: 'SatisfactionCtrl'
      });
  });