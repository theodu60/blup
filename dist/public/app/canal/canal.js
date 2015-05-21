'use strict';

angular.module('fdjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('canal', {
        url: '/canal',
        templateUrl: 'app/canal/canal.html',
        controller: 'CanalCtrl'
      });
  });