'use strict';

angular.module('fdjApp')
  .controller('CanalCtrl', function (upVar,upThis, $http, $rootScope, $timeout) {
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
$rootScope.tabCheck = {}

    //cette fonction permet de switché entre la vue en bar et la vue en tableau dans l onglet comparaison
    $rootScope.toggleView = function () {
      $rootScope.view_value = !$rootScope.view_value;
      if ($rootScope.view_value == true)
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
      updateData();
    }

    //Cette fonction permet de mettre a jour les checkbox 
    $rootScope.updateCheckbox = function () {
      var checkbox = [];
      checkbox[0] = "Hasard";
      checkbox[1] = "Sport";
      checkbox[2] = "Mixte";
      eval("$rootScope.taille" + $rootScope.lastColonne + " = 100");
      for (var key in checkbox) {
        	eval("$rootScope.toggle" + checkbox[key] + $rootScope.lastColonne + " = false");
          eval("$rootScope.selection.toggleChart" + checkbox[key] + $rootScope.lastColonne + " = false");
        	eval("$rootScope.toggleComp" + checkbox[key] + $rootScope.lastColonne + " = false");
      }
      for (var key in $rootScope.example11model) {
          var nomColonne = checkbox[$rootScope.example11model[key].id] + $rootScope.lastColonne;
          eval('$rootScope.selection.toggleChart' + nomColonne + ' = true');
          if ($rootScope.view_value == true) {
            construction(nomColonne, upVar.periode.mois.Code_Mois, upVar.prestation.media.Code_Media,upVar.segmentation.segment.Code_Segment,upVar.segmentation.item.Code_Item, upVar.prestation.prestataire.Code_Prestataire)
            eval("$rootScope.taille" + $rootScope.lastColonne + " = 500");
          } else {
            upThis.buildChart(upVar.question.Code_Question, function (chartBar) {
              upThis.bar(chartBar,
                upVar.periode.mois.Code_Mois, upVar.prestation.media.Code_Media,upVar.segmentation.segment.Code_Segment,upVar.segmentation.item.Code_Item, upVar.prestation.prestataire.Code_Prestataire,
                nomColonne, upVar.question.Code_Question, true);
            })
          }
      }
    }

    //Cette fonction est active quand on clique sur le "Select" de checkox
    $rootScope.actionOnCheckbox = function () {
      if ($rootScope.view_value == false) 
       updateSegmentBar();
     else
       updateSegmentTab2();
    }

    //Cette fonction met a jour les chart en bar
    function updateSegmentBar () {
      var checkbox = [];
      checkbox[0] = {"id": "Hasard", "Code_Media": 0, "Code_Segment": 0, "Code_Item": 0, "Code_Prestataire": 0};
      checkbox[1] = {"id": "Sport", "Code_Media": 0, "Code_Segment": 0, "Code_Item": 0, "Code_Prestataire": 0};
      checkbox[2] = {"id": "Mixte", "Code_Media": 0, "Code_Segment": 0, "Code_Item": 0, "Code_Prestataire": 0};
      //effacer les segments existants
      for (var key in $rootScope.selection.bar){
        for(var key2 in $rootScope.selection.bar[key].segment) {
          $rootScope.selection.bar[key].segment = [];
        }
      }
      upThis.buildChart(upVar.question.Code_Question, function (chartBar) {
        for (var key in $rootScope.example11model) {
          var nomColonne = checkbox[$rootScope.example11model[key].id].id;
          var Code_Media = checkbox[$rootScope.example11model[key].id].Code_Segment;
          var Code_Segment = checkbox[$rootScope.example11model[key].id].Code_Segment;
          var Code_Item = checkbox[$rootScope.example11model[key].id].Code_Item;
          var Code_Prestataire = checkbox[$rootScope.example11model[key].id].Code_Prestataire;
          upThis.bar(
            chartBar,
            upVar.periode.mois.Code_Mois,
            Code_Media,
            Code_Segment,
            Code_Item, 
            Code_Prestataire,
            nomColonne,
            upVar.question.Code_Question,
            true);
        }
      })
    }

    //Cette fonction met a jour les tableau dans comparaison -> vue tableau
    function updateSegmentTab2 () {
      var checkbox = [];
      checkbox[0] = {"id": "Hasard", "Code_Media": 0, "Code_Segment": 0, "Code_Item": 0, "Code_Prestataire": 0};
      checkbox[1] = {"id": "Sport", "Code_Media": 0, "Code_Segment": 0, "Code_Item": 0, "Code_Prestataire": 0};
      checkbox[2] = {"id": "Mixte", "Code_Media": 0, "Code_Segment": 0, "Code_Item": 0, "Code_Prestataire": 0};
      //effacer les segments existants
      for (var key in $rootScope.selection.col){
        for(var key2 in $rootScope.selection.col[key].segment) {
          console.log($rootScope.selection.col[key].segment)
          $rootScope.selection.col[key].segment = [];
        }
      }
        for (var key in $rootScope.example11model) {
          var nomColonne = checkbox[$rootScope.example11model[key].id].id;
          var Code_Media = checkbox[$rootScope.example11model[key].id].Code_Segment;
          var Code_Segment = checkbox[$rootScope.example11model[key].id].Code_Segment;
          var Code_Item = checkbox[$rootScope.example11model[key].id].Code_Item;
          var Code_Prestataire = checkbox[$rootScope.example11model[key].id].Code_Prestataire;
          updateSegmentTab(nomColonne, upVar.periode.mois.Code_Mois, Code_Media,Code_Segment,Code_Item, Code_Prestataire, true);
        }
    }



    //Cette fonction met a jour les tableau evolution
    function updateEvolutionTab (Code_Mois, Code_Media, Code_Segment, Code_Item, Code_Prestataire) {
      upThis.initTimeLine(Code_Mois, 2, function (tabDate) {
        var i = 0;
        for (var mois in tabDate) {
          var Mois_Libel = parseInt(tabDate[mois]['codePeriod'].toString().split('')[2] + tabDate[mois]['codePeriod'].toString().split('')[3]);
          upThis.tabAddOneCol(i, tabDate[mois]['codePeriod'], Code_Media, Code_Segment, Code_Item, Code_Prestataire, $rootScope.Periode_Libel[Mois_Libel], function (tabComparaison) {  
             $rootScope.res_evolution_tab = tabComparaison;
          }); 
          i++;         
        }
      })
    }

/*Cette fonction met a jour les tableau comparaison -> vue question
function updateSegmentTab (nomColonne, questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, segment) {
  upThis.initTimeLine(questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, function (TabQuery) {     
    for (var indice = 0; indice < TabQuery.length; indice++) {
      upThis.buildColonne(TabQuery[indice], nomColonne, indice, function () {
        console.log($rootScope.selection.indicateurClefs)
      })      
    }

    */

function updateIndicateurClefsCompTab (nomColonne, questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, onglet, cb) {
  upThis.buildQuery(questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, function (query) {
    upThis.buildColonne(query, nomColonne, onglet, function (nomColonne, clean) {
      if ($rootScope.selection.indicateurClefs.length > 0) {
        if (onglet == 2) {
          var evo = $rootScope.comparaison($rootScope.selection.indicateurClefs[0].col, clean)
          console.log(evo)
        }
      } else {
        var evo = [];
      }
        $rootScope.selection.indicateurClefs.push({nom:nomColonne, col:clean, evo:evo})
        return cb()
    })
  })
}

$rootScope.test = function (Code_Segment, Code_Sous_Seg) {
  if (!$rootScope.selection.indicateurClefs.checkbox)
    $rootScope.selection.indicateurClefs.checkbox = []
  $rootScope.selection.indicateurClefs.checkbox.push({Code_Segment: Code_Segment, Code_Sous_Seg: Code_Sous_Seg})
  $rootScope.getIndex()
}
/*
    upThis.tabAddOneColBeta(Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment,2, nomColonne, tabDate, segment,  function (tab1, tab2, segment) {
      if(tab2.toString() != "nodata") {
        upThis.comparaison(tab1, tab2, nomColonne, segment);
      }
    });

  })
}
*/

//Cette fonction est pour le chart en bar, on il permet de connaitre l index courant pour l'associé au bon code question et met en suite a jour le chart en bar
$rootScope.getIndex = function (index) {
  if(index == 0)
    upVar.question.Code_Question = 3
  if (index == 1)
    upVar.question.Code_Question = 8
  if (index == 2)
    upVar.question.Code_Question = 11
  if (index == 3)
    upVar.question.Code_Question = 13
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

  $rootScope.templateCas1 = false;
  $rootScope.templateCas2 = false;
  $rootScope.templateCas3 = false;
  $rootScope.templateCas4 = false;
  $rootScope.autre = false;

  var nomOnglet = 'canal'
  eval('$rootScope.selection.'+ nomOnglet + ' = []')
  eval('$rootScope.selection.'+ nomOnglet + '.comparaison = []')

  //---------------------------------------------
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
              //MISE A JOUR DES DIAGRAMME EN BAR
        $rootScope.autre = true;
        upThis.buildChart(0, nomOnglet, onglet, upVar.question.Code_Question, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
          eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:"Service Client", chartConfig:chartConfig, Moyenne:Moyenne, P6:P6})')
            if ($rootScope.checkboxModel.length > 0) {
              angular.forEach($rootScope.checkboxModel, function (value, i) {
                var Code_Segment = value.split("|")[0];
                var Code_SousSegment = value.split("|")[2];
                var segment = value.split("|")[1];
                var sousSegment = value.split("|")[3];
                var nom = segment + ' | ' + sousSegment;
                upThis.buildChart(parseInt(i + 1), nomOnglet, onglet, upVar.question.Code_Question, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
                  eval('$rootScope.selection.' + nomOnglet + '.comparaison['+parseInt(i + 1)+'].bar.push({nom:nom, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6})')
                  console.log($rootScope.selection.canal.comparaison)
                })
              })
            }
        })
      }
      
    } else {
              //MISE A JOUR DU TABLEAU EN EVO
      $rootScope.autre = true;
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
                  $rootScope.selection.canal.evolution6Mois = tmp;
              });
          }, 1500);
      })
    }
  })
}

//-----
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
//-----
//-----
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
//-----
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
//-----

 initMaster ();
$rootScope.currentTpl = '/tpl.html';
  $rootScope.checkAll = function (value) {

          angular.forEach($rootScope.checkboxPanel.Selected, function (item) {
              console.log(item)
          });


  }
 })










