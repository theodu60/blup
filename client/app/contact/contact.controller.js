'use strict';

angular.module('fdjApp')
  .controller('ContactCtrl', function (upVar,upThis, $http, $rootScope, $timeout) {
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
              $rootScope.currentTpl = '/tpl.html';
              $rootScope.initCheckbox();
              updateData();
            });
          });
        });
      });
    });
  });
}
//---------------------------------------//
//------------------HEADER---------------//
//---------------------------------------//
// UPDATE DATE
$rootScope.getMois = function (annee) {
  upVar.periode.annee.Code_Annee = annee.codePeriod;
  upVar.periode.mois.Code_Mois = annee.codePeriod;
  upThis.initMois(function () {
    updateData();
  });
}
$rootScope.MoisVal = function (mois) {
    upVar.periode.mois.Code_Mois = mois.codePeriod;
    updateData();
}
// UPDATE Prestataire
$rootScope.updatePrestataire = function (prestataire) {
  var prestaire = $rootScope.selection.prestataire_value1.Prestataire_Libel.replace(' ','') + "%|%" + $rootScope.selection.prestataire_value2.Prestataire_Libel.replace(' ','');
  upVar.prestataire.premier.Prestataire_Libel = $rootScope.selection.prestataire_value1.Prestataire_Libel.replace(' ','');
  upVar.prestataire.deuxieme.Prestataire_Libel = $rootScope.selection.prestataire_value2.Prestataire_Libel.replace(' ','');
  upThis.initPrestataire(prestaire, function (Code_Prestataire){
    upVar.prestataire.res.Code_Prestataire = Code_Prestataire;
    updateData();
  })
}
// UPDATE Segment
$rootScope.getSousSegment = function (segment) {
  upVar.segmentation.segment.Code_Segment= segment.Code_Segment;
  upVar.segmentation.segment.Segment_Libel = segment.Segment_Libel;

  upThis.initSousSegment(segment.Code_Segment, function (Code_SousSegment){
    upVar.segmentation.sous_segment.Code_Sous_Seg = Code_SousSegment;
    console.log(upVar.segmentation.sous_segment.Code_Sous_Seg)
    updateData();
  })
}
$rootScope.updateSousSegment = function (sous_segment) {
  upVar.segmentation.sous_segment.Code_Sous_Seg = sous_segment.Code_Sous_Seg;
  upVar.segmentation.sous_segment.Sous_Seg_Libel = sous_segment.Sous_Seg_Libel;

    updateData();
}

//cette fonction permet de switché entre la vue en bar et la vue en tableau dans l onglet comparaison
$rootScope.toggleView = function () {
  $rootScope.view_value = !$rootScope.view_value;

  updateData();

}

//Cette fonction est appeller quand on clique sur l onget evolution
$rootScope.swapToEvolution = function () {
  $rootScope.selection.comparaison = !$rootScope.selection.comparaison;
  $rootScope.selection.evolution = !$rootScope.selection.evolution;
  upVar.onglet.comparaison = $rootScope.selection.comparaison;
  upVar.onglet.evolution = $rootScope.selection.evolution;
  updateData();
}

//Cette fonction est appeller quand on clique sur l onget comparaison
$rootScope.swapToComparaison = function () {
  $rootScope.selection.comparaison = !$rootScope.selection.comparaison;
  $rootScope.selection.evolution = !$rootScope.selection.evolution;

  upVar.onglet.comparaison = $rootScope.selection.comparaison;
  upVar.onglet.evolution = $rootScope.selection.evolution;
             $rootScope.view_value = true

  updateData();
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
  $rootScope.initCheckbox();
  updateData();
}

function updateData() {
  //--VARIABLE INITIALISER A CHAQUE UPDATE
  $rootScope.onglet = 3;
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
  $rootScope.selection.evolution = upVar.onglet.evolution;
  $rootScope.selection.comparaison = upVar.onglet.comparaison;
  $rootScope.selection.comparaisonSelect = true;
  $rootScope.selection.comparaisonTabBar = true;
  var nomOnglet = 'contact'
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
  $rootScope.initCheckbox();
  upThis.initEff(Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode);
  upThis.initQuestion(onglet, function (questions) {
    $rootScope.questions = questions
      //MISE A JOUR DU COMPARATEUR
    if (upVar.onglet.comparaison == true) {
      if ($rootScope.view_value == true) {
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
              //MISE A JOUR DES DIAGRAMME EN BAR
        $rootScope.autre = true;
        $rootScope.updateComparateurBar(onglet,Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, prestataire1, prestataire2, segment, sousSegment, Global, questions, nomOnglet, 0, upVar.question.Code_Question, function (){
            if ($rootScope.checkboxModel.length > 0) {
              angular.forEach($rootScope.checkboxModel, function (value, i) {
                var Code_Segment = value.split("|")[0];
                var Code_SousSegment = value.split("|")[2];
                var segment = value.split("|")[1];
                var sousSegment = value.split("|")[3];
                var nom = "-------- " + sousSegment;
                $rootScope.buildChart(parseInt(i + 1), nomOnglet, onglet, upVar.question.Code_Question, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
                  eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:nom, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau4"})')
                  console.log($rootScope.selection.indicateursClefs.comparaison)
                })
              })
            }
        })
      }
      
    } else {
      //MISE A JOUR DU TABLEAU EN EVO
      $rootScope.autre = true;
        $rootScope.loading = true

      upThis.initTimeLineSynthese(questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, function (TabQuery, TabDate) {
        var tmp = [];
        //MISE A JOUR DU TABLEAU EN EVOLUTION
        angular.forEach(TabQuery, function (value, key) {
          $rootScope.getLibelofCodePeriod(TabDate[key].codePeriod, function (Periode_Libel) {
            //Periode_Libel = Periode_Libel + " 20" +TabDate[key].codePeriod.toString().split('')[0] + TabDate[key].codePeriod.toString().split('')[1];
            $rootScope.buildColonne(value, Periode_Libel, function (Periode_Libel, clean) {
              tmp.push({id: key, nom: Periode_Libel, col : clean})
            })
          })
        })
        //A default de trouve meilleurs solution pour attendre que builColonne est fini de travailler, j'utilise ça mais c'est sale ...
          setTimeout(function () {
              $rootScope.$apply(function () {
                  tmp = tmp.reverse();
                  var moisN = tmp[tmp.length - 1].col
                  var moisNmoins1 = tmp[tmp.length - 2].col
                  var evo = $rootScope.comparaison(moisN, moisNmoins1)
                  tmp.push({id: 99, nom: "", evo : evo})
                  $rootScope.selection.indicateursClefs.evolution6Mois = tmp;
                    $rootScope.loading = false

              });
          }, 1500);
      })
    }
  })
  console.log($rootScope.selection.checkedbox)
    console.log($rootScope.checkboxModel)
}
//---------------------------------------------------------------------------//
//-----------FONCTION APPELLER LORS DU CHARGEMENT DE LA PAGE -----------//
//--------------------------------------------------------------------------//
 initMaster ();

 })










