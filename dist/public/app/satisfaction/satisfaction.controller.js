'use strict';

angular.module('fdjApp')
  .controller('SatisfactionCtrl', function (upVar,upThis, $http, $rootScope, $timeout) {
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
              $rootScope.currentTpl = '/tpl.html';
              updateData();
            });
          });
        });
      });
    });
  });
}

//---------------------------------------//
//-----------DIAGRAMME EN BAR-----------//
//---------------------------------------//
$rootScope.slides = [
    {
      titre: 'INDICATEURS CLEFS',
      subtitre: 'SATISFACTION GLOBALE',
      index: '1'
    },
    {
      titre: 'INDICATEURS CLEFS',
      subtitre: 'RESOLUTION DE LA DEMANDE',
      index: '2'
    },
    {
      titre: 'INDICATEURS CLEFS',
      subtitre: 'RECOMMANDATION',
      index: '3'
    },
    {
      titre: 'INDICATEURS CLEFS',
      subtitre: 'CES - CUSTOMER EFFORT SCORE',
      index: '4'
    }
  ];
//Cette fonction est pour le chart en bar, on il permet de connaitre l index courant pour l'associé au bon code question et met en suite a jour le chart en bar
$rootScope.indexSlider = 0;
$rootScope.carouselCtrl = {};

$rootScope.decrementerIndex = function (){
  var nomOnglet = "indicateursClefs"
  if ($rootScope.indexSlider > 0) {
    $rootScope.indexSlider --;
  } else {
    $rootScope.indexSlider = 3;
  }
  if($rootScope.indexSlider == 0)
    upVar.question.Code_Question = 3
  if ($rootScope.indexSlider == 1)
    upVar.question.Code_Question = 8
  if ($rootScope.indexSlider == 2)
    upVar.question.Code_Question = 11
  if ($rootScope.indexSlider == 3)
    upVar.question.Code_Question = 13

  eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar = []');
  updateData();
}

$rootScope.incrementerIndex = function (){
  var nomOnglet = "indicateursClefs"

  if ($rootScope.indexSlider < 3) {
    $rootScope.indexSlider ++;
  } else {
    $rootScope.indexSlider = 0;
  }
  if($rootScope.indexSlider == 0)
    upVar.question.Code_Question = 3
  if ($rootScope.indexSlider == 1)
    upVar.question.Code_Question = 8
  if ($rootScope.indexSlider == 2)
    upVar.question.Code_Question = 11
  if ($rootScope.indexSlider == 3)
    upVar.question.Code_Question = 13

  eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar = []');
  updateData();
}
//---------------------------------------//
//-----------FONCTION PRINCIPAL-----------//
//---------------------------------------//
$rootScope.updateData = function () {
  $rootScope.initCheckbox();
  updateData();
}

function updateData() {
  //--VARIABLE INITIALISER A CHAQUE UPDATE
  $rootScope.onglet = 7;
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

  var nomOnglet = 'satisfaction'
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
      if (upVar.onglet.view_value == true) {
        //MISE A JOUR DU TABLEAU EN EVO
        $rootScope.loading = true
        upThis.initTimeLineSynthese(questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, function (TableauEnEvolution) {
          eval('$rootScope.selection.' + nomOnglet + '.evolution6Mois = [];')
          var moisN = TableauEnEvolution[TableauEnEvolution.length - 1].col
          var moisNmoins1 = TableauEnEvolution[TableauEnEvolution.length - 2].col
          var evo = $rootScope.comparaison(moisN, moisNmoins1)
          TableauEnEvolution.push({id: 99, nom: "", evo : evo})
          eval('$rootScope.selection.' + nomOnglet + '.evolution6Mois = TableauEnEvolution;')

          $rootScope.loading = false
        })
      } else {
        //MISE A JOUR DES DIAGRAMME EN LIGNE
        $rootScope.autre = true;
        $rootScope.loading = true;
        upThis.builChartLine(Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, nomOnglet, 0,function (chartConfig) {
          $rootScope.selection.satisfaction.chartConfig = chartConfig
                  $rootScope.loading = false;
        })
      }
    }
  })
}
//---------------------------------------------------------------------------//
//-----------FONCTION APPELLER LORS DU CHARGEMENT DE LA PAGE -----------//
//--------------------------------------------------------------------------//
 initMaster ();

 })










/*

'use strict';

angular.module('fdjApp')
  .controller('SatisfactionCtrl', function (upVar,upThis, $http, $rootScope, $timeout) {
 //---------------------------------------//
//-----------INITIALISATION-----------//
//---------------------------------------//
    //Cette fonction met a jour le header
function initMaster () {
  upThis.initAnnee(function() {
    upThis.initMois(function () {
      upThis.initPrestataire1(function () {
        upThis.initPrestataire2(function () {
          upThis.initSegment(function (Code_Segment) {
            upThis.initSousSegment(Code_Segment, function (Code_SousSegment) {
              updateData();
            });
          });
        });
      });
    });
  });
}

$rootScope.toggleSelection = function toggleSelection(segment, sous_segment) {
  var res = {
    segment: segment.Code_Segment,
    sous_segment: segment.Segment_Libel,
    Sous_Seg_Libel: sous_segment.Sous_Seg_Libel,
    Code_Sous_Seg: sous_segment.Code_Sous_Seg
  }
  var res2 = segment.Code_Segment + "|" + segment.Segment_Libel + "|" +sous_segment.Code_Sous_Seg + "|" +sous_segment.Sous_Seg_Libel
  var idx = $rootScope.checkboxModel.indexOf(res2);
  if (idx > -1) {
    $rootScope.checkboxModel.splice(idx, 1);

  } else {
    $rootScope.checkboxModel.push(res2);
  }
}
$rootScope.initCheckbox = function () {
  for (var i in $rootScope.selection.checkedbox) {
    $rootScope.selection.checkedbox[i].checked = false
  }
  for (var i in $rootScope.checkboxModel) {
    var Code_Segment = $rootScope.checkboxModel[i].split('|')[0];
    var Code_Sous_Seg = $rootScope.checkboxModel[i].split('|')[2];
    var indice = Code_Segment + '|' + Code_Sous_Seg;
    $rootScope.selection.checkedbox[indice].checked = true
  }
}
//---------------------------------------//
//-----------DIAGRAMME EN BAR-----------//
//---------------------------------------//
$rootScope.slides = [
    {
      titre: 'INDICATEURS CLEFS',
      subtitre: 'SATISFACTION GLOBALE',
      index: '1'
    },
    {
      titre: 'INDICATEURS CLEFS',
      subtitre: 'RESOLUTION DE LA DEMANDE',
      index: '2'
    },
    {
      titre: 'INDICATEURS CLEFS',
      subtitre: 'RECOMMANDATION',
      index: '3'
    },
    {
      titre: 'INDICATEURS CLEFS',
      subtitre: 'CES - CUSTOMER EFFORT SCORE',
      index: '4'
    }
  ];
//Cette fonction est pour le chart en bar, on il permet de connaitre l index courant pour l'associé au bon code question et met en suite a jour le chart en bar
$rootScope.indexSlider = 0;
$rootScope.carouselCtrl = {};

$rootScope.decrementerIndex = function (){
  if ($rootScope.indexSlider > 0) {
    $rootScope.indexSlider --;
  } else {
    $rootScope.indexSlider = 3;
  }
  if($rootScope.indexSlider == 0)
    upVar.question.Code_Question = 3
  if ($rootScope.indexSlider == 1)
    upVar.question.Code_Question = 8
  if ($rootScope.indexSlider == 2)
    upVar.question.Code_Question = 11
  if ($rootScope.indexSlider == 3)
    upVar.question.Code_Question = 13
  updateData();

console.log($rootScope.indexSlider)
}

$rootScope.incrementerIndex = function (){
  if ($rootScope.indexSlider < 3) {
    $rootScope.indexSlider ++;
  } else {
    $rootScope.indexSlider = 0;
  }
  if($rootScope.indexSlider == 0)
    upVar.question.Code_Question = 3
  if ($rootScope.indexSlider == 1)
    upVar.question.Code_Question = 8
  if ($rootScope.indexSlider == 2)
    upVar.question.Code_Question = 11
  if ($rootScope.indexSlider == 3)
    upVar.question.Code_Question = 13
  updateData();


}
//---------------------------------------//
//-----------FONCTION PRINCIPAL-----------//
//---------------------------------------//
$rootScope.updateData = function () {
  updateData();
}



function updateData() {
  //--VARIABLE INITIALISER A CHAQUE UPDATE
  $rootScope.onglet = 7;
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

  $rootScope.templateCas1 = false;
  $rootScope.templateCas2 = false;
  $rootScope.templateCas3 = false;
  $rootScope.templateCas4 = false;
  $rootScope.templateCas5 = false;
  $rootScope.templateCas6 = false;
  $rootScope.templateCas7 = false;
  $rootScope.templateCas8 = false;
  $rootScope.autre = false;
  var nomOnglet = 'satisfaction'
  eval('$rootScope.selection.'+ nomOnglet + ' = []')
  eval('$rootScope.selection.'+ nomOnglet + '.comparaison = []')


  $rootScope.selection.checkedbox[$rootScope.tmpCheckbox] = false
  $rootScope.selection.disable[$rootScope.tmpCheckbox] = false;
  $rootScope.selection.checkedbox[Code_Segment + '|' + Code_SousSegment] = true
  $rootScope.selection.disable[Code_Segment + '|' + Code_SousSegment] = true;
  $rootScope.tmpCheckbox = Code_Segment + '|' + Code_SousSegment;


  //---------------------------------------------
  $rootScope.updateView(onglet, upVar.onglet.comparaison, upVar.onglet.evolution, upVar.onglet.view_value)
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
                  console.log(sousSegment)
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

      if ($rootScope.view_value == true) {
        upThis.initTimeLineSynthese(questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, function (TableauEnEvolution) {
          eval('$rootScope.selection.' + nomOnglet + '.evolution6Mois = [];')
          eval('$rootScope.selection.' + nomOnglet + '.evolution6Mois = TableauEnEvolution;')
          var moisN = TableauEnEvolution[TableauEnEvolution.length - 1].col
          var moisNmoins1 = TableauEnEvolution[TableauEnEvolution.length - 2].col
          var evo = $rootScope.comparaison(moisN, moisNmoins1)
          TableauEnEvolution.push({id: 99, nom: "", evo : evo})
          $rootScope.selection.satisfaction.evolution6Mois = TableauEnEvolution;
          $rootScope.loading = false;
        })
      } else {
        //MISE A JOUR DES DIAGRAMME EN LIGNE
        $rootScope.autre = true;
        $rootScope.loading = true;
        upThis.builChartLine(Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, nomOnglet, 0,function (chartConfig) {
          $rootScope.selection.satisfaction.chartConfig = chartConfig
          setTimeout(function () {
                $rootScope.$apply(function () {
                  $rootScope.loading = false;
                });
            }, 3000);
        })
      }
    }
  })
}


 initMaster ();
 })


*/







