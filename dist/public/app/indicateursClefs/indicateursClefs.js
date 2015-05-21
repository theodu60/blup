'use strict';

angular.module('fdjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('indicateursClefs', {
        url: '/indicateursClefs',
        templateUrl: 'app/indicateursClefs/indicateursClefs.html',
        controller: 'IndicateursClefsCtrl'
      });
  });