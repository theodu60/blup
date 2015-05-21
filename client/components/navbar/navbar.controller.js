'use strict';

angular.module('fdjApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Synthèse',
      'link': '/'
    },
    {
      'title': 'Indicateurs Clefs',
      'link': '/indicateursClefs'
    },
    {
      'title': 'Raisons du Contact',
      'link': '/raisonsDuContact'
    },
    {
      'title': 'Réclamation',
      'link': '/reclamation'
    },
    {
      'title': 'Traitement Justificatifs',
      'link': '/traitementJustificatifs'
    },
    {
      'title': 'Prise en charge',
      'link': '/priseEnChargeEtTraitement'
    },
    {
      'title': 'Satisfaction',
      'link': '/satisfaction'
    },
    {
      'title': 'Changement Canal',
      'link': '/changementCanal'
    }                 
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });