'use strict';

angular.module('fdjApp')
  .controller('CanalCtrl', function (upVar,upThis, $http, $rootScope, $timeout) {
//---------------------------------------//
//-----------INITIALISATION-----------//
//---------------------------------------//
    //Cette fonction met a jour le header
function initMaster () {
  $rootScope.initAnnee(function() {
    $rootScope.initMois(function () {
      $rootScope.initPrestataire1(function () {
        $rootScope.initPrestataire2(function () {
          $rootScope.initSegment(function (Code_Segment) {
            $rootScope.initSousSegment(Code_Segment, function (Code_SousSegment) {
              $rootScope.buildCheckboxPanel(function () {
              $rootScope.currentTpl = '/tpl.html';
              updateData();
              });
            });
          });
        });
      });
    });
  });
}
//---------------------------------------//
//-----------FONCTION PRINCIPAL-----------//
//---------------------------------------//
$rootScope.updateData = function () {
  updateData();
}

function updateData() {
  //--VARIABLE INITIALISER A CHAQUE UPDATE
  $rootScope.onglet = 8;
  var onglet = $rootScope.onglet;
  var Code_Periode = upVar.periode.mois.Code_Mois;
  var Code_Prestataire = upVar.prestataire.res.Code_Prestataire;
  var Code_Segment = upVar.segmentation.segment.Code_Segment;
  var Code_SousSegment = upVar.segmentation.sous_segment.Code_Sous_Seg;
  var tmp = parseInt(Code_Periode.toString().split('')[2] + Code_Periode.toString().split('')[3]);
  if (tmp == 0)
    var Code_TypePeriode = 1
  else
    var Code_TypePeriode = 2

  var Global = "Global";
  var prestataire1 = $rootScope.selection.prestataire_value1.Prestataire_Libel.toString().replace(" ", "");
  var prestataire2 = $rootScope.selection.prestataire_value2.Prestataire_Libel.toString().replace(" ", "");
  var segment = $rootScope.selection.segment_value.Segment_Libel.toString().replace(" ", "");
  var sousSegment = $rootScope.selection.sous_segment_value.Sous_Seg_Libel.toString().replace(" ", "") ;

  var nomOnglet = 'canal'
  eval('$rootScope.selection.'+ nomOnglet + ' = []')
  eval('$rootScope.selection.'+ nomOnglet + '.comparaison = []')
/*

  $rootScope.selection.checkedbox[$rootScope.tmpCheckbox] = false
  $rootScope.selection.disable[$rootScope.tmpCheckbox] = false;
  $rootScope.selection.checkedbox[Code_Segment + '|' + Code_SousSegment] = true
  $rootScope.selection.disable[Code_Segment + '|' + Code_SousSegment] = true;
  $rootScope.tmpCheckbox = Code_Segment + '|' + Code_SousSegment;
*/
  //---------------------------------------------
  $rootScope.updateView(onglet, upVar.onglet.comparaison, upVar.onglet.evolution, upVar.onglet.view_value)
  $rootScope.updateCase(prestataire1, prestataire2, segment, sousSegment, Global);
  upThis.initEff(Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode);
  upThis.initQuestion(onglet, function (questions) {
    $rootScope.questions = questions
      //MISE A JOUR DU COMPARATEUR
    if (upVar.onglet.comparaison == true) {
        $rootScope.updateComparateur(onglet, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, prestataire1, prestataire2, segment, sousSegment, Global, questions, nomOnglet, 0, function (tableau_Periode_Selectionne) {
            for (var indice in tableau_Periode_Selectionne) {
              var referencePeriodeSelectionne = tableau_Periode_Selectionne[indice].col
              var referencePeriodePrecedente = []
              var evo = $rootScope.comparaison(referencePeriodeSelectionne, referencePeriodePrecedente)
              var nom = tableau_Periode_Selectionne[indice].nom
              eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].tab.push({nom:nom, col:referencePeriodeSelectionne, evo:evo})')
            }
            if ($rootScope.checkboxModel.length > 0) {
              $rootScope.templateCasCheck3 = false;
              $rootScope.templateCasCheck4 = false;
              angular.forEach($rootScope.checkboxModel, function (value, i) {
                var Code_Segment = value.split("|")[0];
                var Code_SousSegment = value.split("|")[2];
                var segment = value.split("|")[1];
                var sousSegment = value.split("|")[3];
                $rootScope.updateComparateur(onglet, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, prestataire1, prestataire2, segment, sousSegment, Global, questions, nomOnglet, parseInt(i +1), function (tableau_Periode_Selectionne) {
                  for (var indice in tableau_Periode_Selectionne) {
                    var referencePeriodeSelectionne = tableau_Periode_Selectionne[indice].col
                    var referencePeriodePrecedente = []
                    var evo = $rootScope.comparaison(referencePeriodeSelectionne, referencePeriodePrecedente)
                    var nom = tableau_Periode_Selectionne[indice].nom
                    eval('$rootScope.selection.' + nomOnglet + '.comparaison['+parseInt(i +1)+'].tab.push({nom:nom, col:referencePeriodeSelectionne, evo:evo})')
                  }
                })
              })
            }
        })         
    } else {
      //MISE A JOUR DU TABLEAU EN EVO
      $rootScope.loading = true
      upThis.initTimeLineSynthese(questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, function (TableauEnEvolution) {
        eval('$rootScope.selection.' + nomOnglet + '.evolution6Mois = [];')
        eval('$rootScope.selection.' + nomOnglet + '.evolution6Mois = TableauEnEvolution;')
        $rootScope.loading = false
      })
    }
  })
}
//---------------------------------------------------------------------------//
//-----------FONCTION APPELLER LORS DU CHARGEMENT DE LA PAGE -----------//
//--------------------------------------------------------------------------//
 initMaster ();

 })

