'use strict';

angular.module('fdjApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('traitement', {
        url: '/traitement',
        templateUrl: 'app/traitement/traitement.html',
        controller: 'TraitementCtrl'
      });
  });