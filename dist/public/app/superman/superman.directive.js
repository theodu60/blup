'use strict';

angular.module('fdjApp')
  .directive('superman', function ($rootScope) {
    return {
      template: '<div class="row"><br><div class="col-xs-2"><div class="left_buying"><div class="titre_highchart"><strong>{{texte}}</div></strong><div class="resp_highchart">({{eff}} Resp)</div></div></div><div class="col-xs-8"><div class="center_buying"><highchart id="chart1" config = "chartconfig"></highchart></div></div><div class="col-xs-2"><div class="right_buying"><strong>{{satisfaction}}</strong></div></div></div></div>',
    //  template: '<div class="row"><br><div class="col-xs-2"><div class="left_buying"><div class="titre_highchart"><strong>{{texte}}</div></strong><div class="resp_highchart">({{eff}} Resp)</div></div></div><div class="col-xs-8"><div class="center_buying"><highchart id="chart1" config="selection.chartConfigServiceClient"></highchart></div></div><div class="col-xs-2"><div class="right_buying"><strong>{{satisfaction}}</strong></div></div></div></div>',

      restrict: 'EA',
      link: function ( scope, element, attrs) {

        console.log(eval ('(' + attrs.chartconfig + ')'))
        console.log($rootScope.selection.chartConfigServiceClient)
      	scope.eff = attrs.eff;
      	scope.texte = attrs.texte;
        //scope.chartconfig =  JSON.parse(attrs.chartconfig)
       scope.chartconfig = $rootScope.selection.chartConfigServiceClient
      	scope.satisfaction = attrs.satisfaction;  		
      }
    };
  });

