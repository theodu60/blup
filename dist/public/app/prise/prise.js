'use strict';

angular.module('fdjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('prise', {
        url: '/prise',
        templateUrl: 'app/prise/prise.html',
        controller: 'PriseCtrl'
      });
  });