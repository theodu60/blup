'use strict';

angular.module('fdjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reclamation', {
        url: '/reclamation',
        templateUrl: 'app/reclamation/reclamation.html',
        controller: 'ReclamationCtrl'
      });
  });