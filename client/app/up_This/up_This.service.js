'use strict';

angular.module('fdjApp')
  .factory('upThis', function (upVar, $http, $rootScope, $window, $location) {
//---------------------------------------//
//------------------VARIABLE---------------//
//---------------------------------------//
    $rootScope.lang = {};
    $rootScope.liste_annee = {};
    $rootScope.mois_value = {};
    $rootScope.selection = {
      bar : [],
      col : [],
      synthesis : [{
        evolution6Mois : [{
          nom : "",
          col : []
        }],
        comparaison : [{
          tab : [{
            nom : "",
            col : [],
            evo : []
          }]
        }]
      }],
      indicateursClefs :{
        comparaison : [{
          tab : [[{
            nom : "",
            col : [],
            evo : []
          }]],
          bar : [{
            nom : "",
            col : [],
            evo : [],
            chartConfig : "",
            eff : "",
            satisfaction : "",
          }]
        }],
        evolution6Mois : [{
          nom : "",
          col : []
        }]
      }
    };
    $rootScope.checkboxPanel = {
      segment : [{
        Segment_Libel: "",
        Code_Segment: "",
        sous_segment: [{
          Sous_Seg_Libel: "",
          Code_Sous_Seg: "",
        }],
        Selected: false
      }]
    }
    $rootScope.tableau = [];
    $rootScope.res_evolution_tab = [];
    $rootScope.checkboxModel = [];
    $rootScope.selection.comparaison = upVar.onglet.comparaison;
    $rootScope.selection.evolution = upVar.onglet.evolution;
    $rootScope.selection.disable = [];

    $rootScope.view_value = true;
    $rootScope.ouvert = true;
    $rootScope.toggleCheckbox = false;
    $rootScope.Periode_Libel = [];
    $rootScope.Periode_Libel['0'] = "Full Year";    
    $rootScope.Periode_Libel['1'] = "January";    
    $rootScope.Periode_Libel['2'] = "February";    
    $rootScope.Periode_Libel['3'] = "March";    
    $rootScope.Periode_Libel['4'] = "April";    
    $rootScope.Periode_Libel['5'] = "May";    
    $rootScope.Periode_Libel['6'] = "June";    
    $rootScope.Periode_Libel['7'] = "Juily";    
    $rootScope.Periode_Libel['8'] = "Aout";    
    $rootScope.Periode_Libel['9'] = "September";    
    $rootScope.Periode_Libel['10'] = "October";    
    $rootScope.Periode_Libel['11'] = "November";    
    $rootScope.Periode_Libel['12'] = "December";    
    $rootScope.isCollapsed = true;
    $rootScope.selection.checkedbox = [];
//---------------------------------------//
//------------------HEADER---------------//
//---------------------------------------//
// UPDATE DATE
$rootScope.getMois = function (annee) {
  upVar.periode.annee.Code_Annee = annee.codePeriod;
  upVar.periode.mois.Code_Mois = annee.codePeriod;
   $rootScope.initMois(function () {
    $rootScope.updateData();
  });
}
$rootScope.MoisVal = function (mois) {
    upVar.periode.mois.Code_Mois = mois.codePeriod;
    $rootScope.updateData();
}
// UPDATE Prestataire
$rootScope.updatePrestataire = function (prestataire) {
  var prestaire = $rootScope.selection.prestataire_value1.Prestataire_Libel.replace(' ','') + "%|%" + $rootScope.selection.prestataire_value2.Prestataire_Libel.replace(' ','');
  upVar.prestataire.premier.Prestataire_Libel = $rootScope.selection.prestataire_value1.Prestataire_Libel.replace(' ','');
  upVar.prestataire.deuxieme.Prestataire_Libel = $rootScope.selection.prestataire_value2.Prestataire_Libel.replace(' ','');
   $rootScope.initPrestataire(prestaire, function (Code_Prestataire){
    upVar.prestataire.res.Code_Prestataire = Code_Prestataire;
    $rootScope.updateData();
  })
}
// UPDATE Segment
$rootScope.getSousSegment = function (segment) {
  upVar.segmentation.segment.Code_Segment= segment.Code_Segment;
  upVar.segmentation.segment.Segment_Libel = segment.Segment_Libel;

   $rootScope.initSousSegment(segment.Code_Segment, function (Code_SousSegment){
    upVar.segmentation.sous_segment.Code_Sous_Seg = Code_SousSegment;
    console.log(upVar.segmentation.sous_segment.Code_Sous_Seg)
    $rootScope.updateData();
  })
}
$rootScope.updateSousSegment = function (sous_segment) {
  upVar.segmentation.sous_segment.Code_Sous_Seg = sous_segment.Code_Sous_Seg;
  upVar.segmentation.sous_segment.Sous_Seg_Libel = sous_segment.Sous_Seg_Libel;

    $rootScope.updateData();
}

//cette fonction permet de switché entre la vue en bar et la vue en tableau dans l onglet comparaison
$rootScope.toggleView = function () {
  upVar.onglet.view_value = !upVar.onglet.view_value;
  $rootScope.updateData();
}

//Cette fonction est appeller quand on clique sur l onget evolution
$rootScope.swapToEvolution = function () {
  upVar.onglet.comparaison = !upVar.onglet.comparaison;
  upVar.onglet.evolution = !upVar.onglet.evolution;
  $rootScope.updateData();
}

//Cette fonction est appeller quand on clique sur l onget comparaison
$rootScope.swapToComparaison = function () {
  upVar.onglet.comparaison = !upVar.onglet.comparaison;
  upVar.onglet.evolution = !upVar.onglet.evolution;
  $rootScope.updateData();
}
$rootScope.initAnnee =  function (cb) {
    $http.get('/api/getAnnees').success(function(data, status, headers, config) {    
      try { 
          $rootScope.liste_annee = data;
          var indice = 0;
          var tmp = 0;
          for (var i in data) {
            if (data[i]['codePeriod'] == upVar.periode.annee.Code_Annee)
              indice = tmp;
            else
              tmp++;
          }
          $rootScope.selection.annee_value = $rootScope.liste_annee[indice];
          return cb()
        }
      catch (e) {console.log(e)}
    })
}
$rootScope.initMois =  function (cb) {
    $http.get('/api/getMoiss', {params: {annee : $rootScope.selection.annee_value.year}
    }).success(function(data, status, headers, config) {    
      try { 
          $rootScope.liste_mois = data;
          var indice = 0;
          var tmp = 0;
          for (var i in data) {
            if (data[i]['codePeriod'] == upVar.periode.annee.Code_Annee) {
              indice = tmp;

            } else {
              tmp++;
            }
          }
          $rootScope.selection.mois_value = $rootScope.liste_mois[upVar.periode.mois.Code_Mois.toString().split('')[3]];
          return cb()
        }
      catch (e) {console.log(e)}
    })
}
$rootScope.initPrestataire1 = function (cb) {
    $http.get('/api/getPrestataire1s').success(function(data, status, headers, config) {    
      try { 
          $rootScope.liste_prestataire1 = data;
          var indice = 0;
          var tmp = 0;
          for (var i in data) {
            if (data[i]['Prestataire_Libel'].toString().replace(" ", "") == upVar.prestataire.premier.Prestataire_Libel.toString().replace(" ", ""))
              indice = tmp;
            else
              tmp++;
          }
          $rootScope.selection.prestataire_value1 = $rootScope.liste_prestataire1[indice];
          upVar.prestataire.premier.Prestataire_Libel = $rootScope.liste_prestataire1[indice].Prestataire_Libel.toString().replace(" ", "");
          return cb()
        }
      catch (e) {console.log(e)}
    })
}
$rootScope.initPrestataire2 = function (cb) {
    $http.get('/api/getPrestataire2s').success(function(data, status, headers, config) {    
      try { 
          $rootScope.liste_prestataire2 = data;
          var indice = 0;
          var tmp = 0;
          for (var i in data) {
            if (data[i]['Prestataire_Libel'].toString().replace(" ", "") == upVar.prestataire.deuxieme.Prestataire_Libel.toString().replace(" ", ""))
              indice = tmp;
            else
              tmp++;
          }
          $rootScope.selection.prestataire_value2 = $rootScope.liste_prestataire2[indice];
          upVar.prestataire.deuxieme.Prestataire_Libel = $rootScope.liste_prestataire2[indice].Prestataire_Libel.toString().replace(" ", "");
          return cb()
        }
      catch (e) {console.log(e)}
    })
}
$rootScope.initPrestataire =  function (prestataireLibel, cb) {
    $http.get('/api/getPrestataires', {params: {prestataireLibel : prestataireLibel}
    }).success(function(data, status, headers, config) {    
          return cb(data[0].code_prestataire)
    })
}
$rootScope.initSegment = function (cb) {
    $http.get('/api/getSegments').success(function(data, status, headers, config) {    
      try { 
          $rootScope.liste_segment = data;
          var indice = 0;
          var tmp = 0;
          for (var i in data) {
            if (data[i]['Segment_Libel'] == upVar.segmentation.segment.Segment_Libel)
              indice = tmp;
            else
              tmp++;
          }
          $rootScope.selection.segment_value = $rootScope.liste_segment[indice];
          upVar.segmentation.segment.Segment_Libel = $rootScope.liste_segment[indice].Segment_Libel;
          return cb ($rootScope.liste_segment[indice].Code_Segment)
        }
      catch (e) {console.log(e)}
    })
}
$rootScope.initSousSegment = function (Code_Segment, cb) {
    $http.get('/api/getSousSegments', {params: {Code_Segment : Code_Segment}
    }).success(function(data, status, headers, config) {    
      try { 
          $rootScope.liste_sous_segment = data;
          var indice = 0;
          var tmp = 0;
          for (var i in data) {
            if (data[i]['Sous_Seg_Libel'] == upVar.segmentation.sous_segment.Code_Sous_Seg)
              indice = tmp;
            else
              tmp++;
          }
          $rootScope.selection.sous_segment_value = $rootScope.liste_sous_segment[indice];
          upVar.segmentation.sous_segment.Code_Sous_Seg = $rootScope.liste_sous_segment[indice].Code_Sous_Seg;
          return cb ($rootScope.liste_sous_segment[indice].Code_Sous_Seg)
        }
      catch (e) {console.log(e)}
    })
}
//---------------------------------------//
//------Convertion donnees---------------//
//---------------------------------------//
$rootScope.getLibelofCodePeriod = function (Code_Periode, cb) {
  var tmp = parseInt(Code_Periode.toString().split('')[2] + Code_Periode.toString().split('')[3]);
  return cb($rootScope.Periode_Libel[tmp])
}
$rootScope.getLibelofCodePeriodSynchrone = function (Code_Periode) {
  var tmp = parseInt(Code_Periode.toString().split('')[2] + Code_Periode.toString().split('')[3]);
  return ($rootScope.Periode_Libel[tmp])
}
$rootScope.ObjectToArray = function (object, cb) {
  var clean = [];
  var i = 0;

  for (var x in object) {
    clean[i] = object[x].mois;
    i++;
  }
  return cb(clean)
}


//---------------------------------------//
//------------------COMPARAISON----------//
//---------------------------------------//
$rootScope.comparaison = function (tab1, tab2) {
  var res = [];
  for (var val = 0; val < tab1.length; val++) {

    if (parseInt(tab1[val]) < parseInt(tab2[val]))
      res[val] = '<'
    else if (parseInt(tab1[val]) > parseInt(tab2[val]))
      res[val] = '>'
    else if (parseInt(tab1[val]) == parseInt(tab2[val]))
      res[val] = '=='
    else
      res[val] = 'NULL'
  }
  return (res)
}
$rootScope.updateIndicateurClefsCompTab = function  (nomColonne, questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_Type_periode, onglet, nomOnglet,  index,tableau,  cb) {
  $http.get('/api/getTimeLineSyntheses', {
      params: {
        codeTypeperiod: Code_Type_periode,
        Code_Periode: Code_Periode,
        Code_Prestataire: Code_Prestataire,
        Code_Segment: Code_Segment,
        Code_SousSegment: Code_SousSegment,
        questions: questions
  }
  })
  .success(function(data, status, headers, config) {
      try {
          var clean = data[data.length - 1].col
          tableau.push({nom:nomColonne, col:clean, evo:[]})
          return cb(tableau)
      } catch(e) {
          console.log(e);
      }
  })
  .error(function(data, status, headers, config) {
      console.log ("error recuperation");
  });
}
$rootScope.updateComparaison = function (comparaison) {
  var referenceComparaison = comparaison.tab[0].col;
  for (var indice in comparaison.tab) {
    var evo = $rootScope.comparaison(referenceComparaison, comparaison.tab[indice].col)
    eval('$rootScope.selection.' + nomOnglet + '.comparaison['+index+'].tab.push({nom:nomColonne, col:clean, evo:[]})')
  }
}
$rootScope.updateComparateur = function (onglet, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, prestataire1, prestataire2, segment, sousSegment, Global, questions, nomOnglet,  index, cb) {
      //CAS 1
  eval('$rootScope.selection.' + nomOnglet + '.comparaison['+index+'] = []')
  eval('$rootScope.selection.' + nomOnglet + '.comparaison['+index+'].tab = []')
  var tableau = [];
  var Code_PrestataireGlobal = parseInt(Code_Prestataire.toString()[0]) + 0;
  console.log(Code_PrestataireGlobal)
  if (prestataire1 == Global && prestataire2 == Global && segment == Global && sousSegment == Global) {
    $rootScope.updateIndicateurClefsCompTab("ServiceClient", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet, index, tableau, function (tableau){
         return cb(tableau)
    });
  
  }
  //CAS 2 ET 
  else if (prestataire1 != Global && prestataire2 == Global && segment == Global && sousSegment == Global){
    $rootScope.updateIndicateurClefsCompTab("ServiceClient", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
      $rootScope.updateIndicateurClefsCompTab(prestataire1, questions, Code_Periode, Code_Prestataire, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau) {
        return cb(tableau)
      });
    });
  }
  //CAS 3 
  else if (prestataire1 != Global && prestataire2 != Global && segment == Global && sousSegment == Global){
    $rootScope.updateIndicateurClefsCompTab("ServiceClient", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
      $rootScope.updateIndicateurClefsCompTab("Global", questions, Code_Periode, Code_PrestataireGlobal, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
        $rootScope.updateIndicateurClefsCompTab(prestataire2, questions, Code_Periode, Code_Prestataire, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
          return cb(tableau)
        });            
      });          
    });
  }
  //CAS 4
  else if (prestataire1 != Global && prestataire2 != Global && segment != Global && sousSegment != Global){
      $rootScope.updateIndicateurClefsCompTab("ServiceClient", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index,tableau, function (tableau){
        $rootScope.updateIndicateurClefsCompTab("Global", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau,function (tableau){
          $rootScope.updateIndicateurClefsCompTab("Global", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau,function (tableau){
            $rootScope.updateIndicateurClefsCompTab(sousSegment, questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, onglet, nomOnglet,  index, tableau,function (tableau){
                      return cb(tableau)
            });
          });            
        });            
      });
    //CAS 5
  } else if (prestataire1 == Global && prestataire2 != Global && segment == Global && sousSegment == Global) {
    $rootScope.updateIndicateurClefsCompTab("Global", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
      $rootScope.updateIndicateurClefsCompTab(prestataire2, questions, Code_Periode, Code_Prestataire, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau) {
        return cb(tableau)
      });
    });
    //CAS 6
  } else if (prestataire1 == Global && prestataire2 != Global && segment != Global && sousSegment != Global) {
    $rootScope.updateIndicateurClefsCompTab("ServiceClient", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
      $rootScope.updateIndicateurClefsCompTab("Global", questions, Code_Periode, Code_PrestataireGlobal, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
        $rootScope.updateIndicateurClefsCompTab(sousSegment, questions, Code_Periode, Code_Prestataire, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
          return cb(tableau)
        });            
      });          
    });
  } else if (prestataire1 == Global && prestataire2 == Global && segment != Global && sousSegment != Global) {
    $rootScope.updateIndicateurClefsCompTab("Global", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau,function (tableau){
      $rootScope.updateIndicateurClefsCompTab(sousSegment, questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, onglet, nomOnglet,  index, tableau,function (tableau){
                return cb(tableau)
      });
    });            
  } else if (prestataire1 != Global && prestataire2 == Global && segment != Global && sousSegment != Global) {
    $rootScope.updateIndicateurClefsCompTab("ServiceClient", questions, Code_Periode, 0, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
      $rootScope.updateIndicateurClefsCompTab("Global", questions, Code_Periode, Code_PrestataireGlobal, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
        $rootScope.updateIndicateurClefsCompTab(prestataire2, questions, Code_Periode, Code_Prestataire, 0, 0, Code_TypePeriode, onglet, nomOnglet,  index, tableau, function (tableau){
          return cb(tableau)
        });            
      });          
    });
  }
   else {
    alert("combinaison inconnue")
   }
}
//---------------------------------------//
//------------------BAR---------------//
//---------------------------------------//

$rootScope.buildChart = function (indice, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, cb) {
    $http.get('/api/buildCharts', {
        params: {
        Code_Question: Code_Question,
        Code_Periode: Code_Periode,
        Code_Prestataire: Code_Prestataire,
        Code_Segment: Code_Segment,
        Code_SousSegment: Code_SousSegment,
        Code_TypePeriode: Code_TypePeriode,
        onglet: onglet
    }
    })
    .success(function(data, status, headers, config) {
      try {
          return cb(data[0], data[1], data[2]);
      } catch(e) {
        console.log(e);
      }
  })
}

$rootScope.updateComparateurBar = function (onglet, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, prestataire1, prestataire2, segment, sousSegment, Global, questions, nomOnglet, index, Code_Question, cb) {
  eval('$rootScope.selection.' + nomOnglet + '.comparaison['+index+'] = []')
  eval('$rootScope.selection.' + nomOnglet + '.comparaison['+index+'].bar = []')
  var Code_PrestataireGlobal = parseInt(Code_Prestataire.toString().split('')[0] + "0");
  if (prestataire1 == Global && prestataire2 == Global && segment == Global && sousSegment == Global) {
      $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
        eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:"Service Client", chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau1"})')
        return cb();
      })
  }
  //CAS 2 
  else if (prestataire1 != Global && prestataire2 == Global && segment == Global && sousSegment == Global){
    $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, 0, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
      eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:"Service Client", chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau1"})')
      $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
        eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "---- " + prestataire1, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau2"})')
        return cb();
      })
    })
  }
  //CAS 3 
  else if (prestataire1 != Global && prestataire2 != Global && segment == Global && sousSegment == Global){
    $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, 0, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
      eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:"Service Client", chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau1"})')
      $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_PrestataireGlobal, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
        eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "---- " + prestataire1, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau2"})')
        $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
          eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "-------- " + prestataire2, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau3"})')
          return cb();
        })
      })
    })
  }
  //CAS 4
  else if (prestataire1 != Global && prestataire2 != Global && segment != Global && sousSegment != Global){
      $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, 0, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
        eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:"Service Client", chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau1"})')
        $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_PrestataireGlobal, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
          eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "---- " + prestataire1, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau2"})')
          $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
            eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "-------- " + prestataire2, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau3"})')
            $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
              eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "------------ " + sousSegment, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau4"})')
              return cb();
            })
          })
        })
      })
    //CAS 5
  } else if (prestataire1 == Global && prestataire2 != Global && segment == Global && sousSegment == Global) {
    $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, 0, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
      eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:"Service Client", chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau1"})')
      $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
        eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "---- " + prestataire1, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau3"})')
        return cb();
      })
    })
    //CAS 6
  } else if (prestataire1 == Global && prestataire2 != Global && segment != Global && sousSegment != Global) {
    $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, 0, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
      eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:"Service Client", chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau1"})')
      $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_PrestataireGlobal, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
        eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "---- " + prestataire1, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau3"})')
        $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
          eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "-------- " + prestataire2, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau4"})')
          return cb();
        })
      })
    })
  } else if (prestataire1 == Global && prestataire2 == Global && segment != Global && sousSegment != Global) {
    $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, 0, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
      eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:"Service Client", chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau1"})')
      $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
        eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "---- " + prestataire1, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau4"})')
        return cb();
      })
    })
  } else if (prestataire1 != Global && prestataire2 == Global && segment != Global && sousSegment != Global) {
    $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, 0, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
      eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom:"Service Client", chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau1"})')
      $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_PrestataireGlobal, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
        eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "---- " + prestataire1, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau2"})')
        $rootScope.buildChart(index, nomOnglet, onglet, Code_Question, Code_Periode, Code_Prestataire, 0, 0, Code_TypePeriode,  function (chartConfig, Moyenne, P6){
          eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].bar.push({nom: "-------- " + prestataire2, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau4"})')
          return cb();
        })
      })
    })
  }
   else {
    alert("combinaison inconnue")
   }
}
//---------------------------------------//
//------------------VIEWS---------------//
//---------------------------------------//
$rootScope.updateCase = function (prestataire1, prestataire2, segment, sousSegment, Global) {
  $rootScope.templateCas1 = false;
  $rootScope.templateCas2 = false;
  $rootScope.templateCas3 = false;
  $rootScope.templateCas4 = false;
  $rootScope.templateCas5 = false;
  $rootScope.templateCas6 = false;
  $rootScope.templateCas7 = false;
  $rootScope.templateCas8 = false;

  //CAS 1
  if (prestataire1 == Global && prestataire2 == Global && segment == Global && sousSegment == Global)
    $rootScope.templateCas1 = true;
  //CAS 2 
  else if (prestataire1 != Global && prestataire2 == Global && segment == Global && sousSegment == Global)
    $rootScope.templateCas2 = true;
  //CAS 3 
  else if (prestataire1 != Global && prestataire2 != Global && segment == Global && sousSegment == Global)
    $rootScope.templateCas3 = true;
  //CAS 4
  else if (prestataire1 != Global && prestataire2 != Global && segment != Global && sousSegment != Global)
    $rootScope.templateCas4 = true;
  //CAS 5
  else if (prestataire1 == Global && prestataire2 != Global && segment == Global && sousSegment == Global)
    $rootScope.templateCas5 = true;
  //CAS 6
  else if (prestataire1 == Global && prestataire2 != Global && segment != Global && sousSegment != Global)
    $rootScope.templateCas6 = true;
  //CAS 7
  else if (prestataire1 == Global && prestataire2 == Global && segment != Global && sousSegment != Global)
    $rootScope.templateCas7 = true;
  //CAS 8
  else if (prestataire1 != Global && prestataire2 == Global && segment != Global && sousSegment != Global)
    $rootScope.templateCas8 = true;
  else 
    alert("combinaison inconnue")
}
$rootScope.updateView = function (onglet, comparaison, evolution, graphique) {
  //PAGE SATISFACTION
  if ((onglet == 7) && (comparaison == true) && (evolution == false) && (graphique == true)) {
    $rootScope.selection.evolution = false;
    $rootScope.selection.comparaison = true;
    $rootScope.view_value = true;
    $rootScope.selection.comparaisonTabBar = false;
    $rootScope.selection.comparaisonSelect = true;
  } else if ((onglet == 7) && (comparaison == false) && (evolution == true) && (graphique == true)) {
    $rootScope.selection.evolution = true;
    $rootScope.selection.comparaison = false;
    $rootScope.view_value = true;
    $rootScope.selection.comparaisonTabBar = true;
    $rootScope.selection.comparaisonSelect = false;
  } else if ((onglet == 7) && (comparaison == false) && (evolution == true) && (graphique == false)) {
    $rootScope.selection.evolution = true;
    $rootScope.selection.comparaison = false;
    $rootScope.view_value = false;
    $rootScope.selection.comparaisonTabBar = true;
    $rootScope.selection.comparaisonSelect = false;
  } else if ((onglet == 7) && (comparaison == true) && (evolution == false) && (graphique == false)) {
    $rootScope.selection.evolution = false;
    $rootScope.selection.comparaison = true;
    $rootScope.view_value = true;
    $rootScope.selection.comparaisonTabBar = true;
    $rootScope.selection.comparaisonSelect = true;

  //PAGE INDICATEURSCLEFS
  } else if ((onglet == 2) && (comparaison == false) && (evolution == true) && (graphique == true)) {
    $rootScope.selection.evolution = true;
    $rootScope.selection.comparaison = false;
    $rootScope.view_value = true;
    $rootScope.selection.comparaisonTabBar = false;
    $rootScope.selection.comparaisonSelect = false;
  } else if ((onglet == 2) && (comparaison == true) && (evolution == false) && (graphique == true)) {
    $rootScope.selection.evolution = false;
    $rootScope.selection.comparaison = true;
    $rootScope.view_value = true;
    $rootScope.selection.comparaisonTabBar = true;
    $rootScope.selection.comparaisonSelect = true;
  } else if ((onglet == 2) && (comparaison == true) && (evolution == false) && (graphique == false)) {
    $rootScope.selection.evolution = false;
    $rootScope.selection.comparaison = true;
    $rootScope.view_value = false;
    $rootScope.selection.comparaisonTabBar = true;
    $rootScope.selection.comparaisonSelect = true;
  } else if ((onglet == 2) && (comparaison == false) && (evolution == true) && (graphique == false)) {
    $rootScope.selection.evolution = true;
    $rootScope.selection.comparaison = false;
    $rootScope.view_value = true;
    $rootScope.selection.comparaisonTabBar = false;
    $rootScope.selection.comparaisonSelect = false;

    //PAGE CONTACT
  } else if (((onglet != 7) && (onglet != 2)) && (comparaison == false) && (evolution == true)) {
    $rootScope.selection.evolution = true;
    $rootScope.selection.comparaison = false;
    $rootScope.view_value = true;
    $rootScope.selection.comparaisonTabBar = false;
    $rootScope.selection.comparaisonSelect = true;
  } else if (((onglet != 7) && (onglet != 2)) && (comparaison == true) && (evolution == false)) {
    $rootScope.selection.evolution = false;
    $rootScope.selection.comparaison = true;
    $rootScope.view_value = true;
    $rootScope.selection.comparaisonTabBar = false;
    $rootScope.selection.comparaisonSelect = true;
  } else {
    console.log("combinaison inconnu")
    console.log("onglet "  + onglet)
    console.log("comparaison "  + comparaison)
    console.log("evolution "  + evolution)
    console.log("graphique "  + graphique)
  }

}





//---------------------------------------//
//------------PDF ET PRINT---------------//
//---------------------------------------//
$rootScope.print = function(divName) {
    $window.print();
} 
$rootScope.report = function(divName) {
    $location.path('/report');
} 
//---------------------------------------//
//------------------JUNK---------------//
//---------------------------------------//
function simpleQuery (query, cb) {
    $http.get('/api/querys', 
    {params: {query : query}
    }).success(function(data, status, headers, config) {    
      return cb(data)
  })
}



$rootScope.toggleSelection = function (segment, sous_segment) {
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

  for (var i in $rootScope.selection.checkedbox) {
    $rootScope.selection.checkedbox[i] = false
  }
  for (var i in $rootScope.checkboxModel) {
    var Code_Segment = $rootScope.checkboxModel[i].split('|')[0];
    var Code_Sous_Seg = $rootScope.checkboxModel[i].split('|')[2];
    var indice = Code_Segment + '|' + Code_Sous_Seg;
    $rootScope.selection.checkedbox[indice] = true
  }
}

$rootScope.initCheckbox = function () {

}
$rootScope.buildCheckboxPanel = function (cb) {
    $http.get('/api/buildCheckboxs').success(function(data, status, headers, config) {    
      try { 
            $rootScope.selection.checkboxPanel = data
            return cb ()
      } catch (e) {
        console.log(e)
      }
    })
}                                                 
    upVar.login.local = "";
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      initAnnee: function (cb) {
          $http.get('/api/getAnnees').success(function(data, status, headers, config) {    
            try { 
                $rootScope.liste_annee = data;
                var indice = 0;
                var tmp = 0;
                for (var i in data) {
                  if (data[i]['codePeriod'] == upVar.periode.annee.Code_Annee)
                    indice = tmp;
                  else
                    tmp++;
                }
                $rootScope.selection.annee_value = $rootScope.liste_annee[indice];
                return cb()
              }
            catch (e) {console.log(e)}
          })
      },
      initMois: function (cb) {
          $http.get('/api/getMoiss', {params: {annee : $rootScope.selection.annee_value.year}
          }).success(function(data, status, headers, config) {    
            try { 
                $rootScope.liste_mois = data;
                var indice = 0;
                var tmp = 0;
                for (var i in data) {
                  if (data[i]['codePeriod'] == upVar.periode.annee.Code_Annee) {
                    indice = tmp;

                  } else {
                    tmp++;
                  }
                }
                $rootScope.selection.mois_value = $rootScope.liste_mois[upVar.periode.mois.Code_Mois.toString().split('')[3]];
                return cb()
              }
            catch (e) {console.log(e)}
          })
      },
      initPrestataire1: function (cb) {
          $http.get('/api/getPrestataire1s').success(function(data, status, headers, config) {    
            try { 
                $rootScope.liste_prestataire1 = data;
                var indice = 0;
                var tmp = 0;
                for (var i in data) {
                  if (data[i]['Prestataire_Libel'].toString().replace(" ", "") == upVar.prestataire.premier.Prestataire_Libel.toString().replace(" ", ""))
                    indice = tmp;
                  else
                    tmp++;
                }
                $rootScope.selection.prestataire_value1 = $rootScope.liste_prestataire1[indice];
                upVar.prestataire.premier.Prestataire_Libel = $rootScope.liste_prestataire1[indice].Prestataire_Libel.toString().replace(" ", "");
                return cb()
              }
            catch (e) {console.log(e)}
          })
      },
      initPrestataire2: function (cb) {
          $http.get('/api/getPrestataire2s').success(function(data, status, headers, config) {    
            try { 
                $rootScope.liste_prestataire2 = data;
                var indice = 0;
                var tmp = 0;
                for (var i in data) {
                  if (data[i]['Prestataire_Libel'].toString().replace(" ", "") == upVar.prestataire.deuxieme.Prestataire_Libel.toString().replace(" ", ""))
                    indice = tmp;
                  else
                    tmp++;
                }
                $rootScope.selection.prestataire_value2 = $rootScope.liste_prestataire2[indice];
                upVar.prestataire.deuxieme.Prestataire_Libel = $rootScope.liste_prestataire2[indice].Prestataire_Libel.toString().replace(" ", "");
                return cb()
              }
            catch (e) {console.log(e)}
          })
      },
      initPrestataire: function (prestataireLibel, cb) {
          $http.get('/api/getPrestataires', {params: {prestataireLibel : prestataireLibel}
          }).success(function(data, status, headers, config) {    
                return cb(data[0].code_prestataire)
          })
      },
      initSegment: function (cb) {
          $http.get('/api/getSegments').success(function(data, status, headers, config) {    
            try { 
                $rootScope.liste_segment = data;
                var indice = 0;
                var tmp = 0;
                for (var i in data) {
                  if (data[i]['Segment_Libel'] == upVar.segmentation.segment.Segment_Libel)
                    indice = tmp;
                  else
                    tmp++;
                }
                $rootScope.selection.segment_value = $rootScope.liste_segment[indice];
                upVar.segmentation.segment.Segment_Libel = $rootScope.liste_segment[indice].Segment_Libel;
                return cb ($rootScope.liste_segment[indice].Code_Segment)
              }
            catch (e) {console.log(e)}
          })
      },
      initSousSegment: function (Code_Segment, cb) {
          $http.get('/api/getSousSegments', {params: {Code_Segment : Code_Segment}
          }).success(function(data, status, headers, config) {    
            try { 
                $rootScope.liste_sous_segment = data;
                var indice = 0;
                var tmp = 0;
                for (var i in data) {
                  if (data[i]['Sous_Seg_Libel'] == upVar.segmentation.sous_segment.Code_Sous_Seg)
                    indice = tmp;
                  else
                    tmp++;
                }
                $rootScope.selection.sous_segment_value = $rootScope.liste_sous_segment[indice];
                upVar.segmentation.sous_segment.Code_Sous_Seg = $rootScope.liste_sous_segment[indice].Code_Sous_Seg;
                return cb ($rootScope.liste_sous_segment[indice].Code_Sous_Seg)
              }
            catch (e) {console.log(e)}
          })
      },
      initQuestion : function (onglet, cb) {
            $http.get('/api/getQuestions', {
                params: {
                  onglet: onglet
            }
            })
            .success(function(data, status, headers, config) {
                var questions = [{
                  indicateur: "",
                  libel_appli_1: "",
                  libel_appli_2: "",
                  libel_Donnees: "",
                  Donnees: "",
                  Code_Question: ""
                }];
                if (onglet == 7 || onglet < 3) {
                  for (var d in data) {
                    var indicateur = data[d].Indicateur
                    var libel_appli_1 = data[d].libel_appli_1
                    var libel_appli_2 = data[d].libel_appli_2
                    var libel_Donnees = data[d].libel_Donnees.split('|')
                    var Donnees = data[d].Donnees.split('|')
                    var Code_Question = data[d].Code_Question

                    for (var i = 0; i < Donnees.length; i++) {
                      if (Donnees[i] == indicateur)
                        var indice = i;
                    }
                    questions[d] = {
                      indicateur: indicateur,
                      libel_appli_1 : libel_appli_1,
                      libel_appli_2 : libel_appli_2,
                      libel_Donnees : libel_Donnees[indice],
                      Code_Question : Code_Question,
                      Donnees: Donnees
                    }
                  }
                } else {
                  var d = 0;
                    var indicateur = data[d].Indicateur
                    var libel_appli_1 = data[d].libel_appli_1
                    var libel_appli_2 = data[d].libel_appli_2
                    var libel_Donnees = data[d].libel_Donnees.split('|')
                    var Donnees = data[d].Donnees.split('|')
                    var Code_Question = data[d].Code_Question

                    questions[d] = {
                      indicateur: indicateur,
                      libel_appli_1 : libel_appli_1,
                      libel_appli_2 : libel_appli_2,
                      libel_Donnees : libel_Donnees[indice],
                      Code_Question : Code_Question,
                      Donnees: Donnees
                    }
                    var tabIndicateur = data[1].Indicateur.split('|');
                    var tabDonnees = data[1].Donnees.split('|');
                    var libel_Donnees = data[1].libel_Donnees.split('|');
                    var Code_Question = data[1].Code_Question
                    var z = 1;
                    for (var i in tabIndicateur) {
                      questions[z] = {
                        indicateur: tabIndicateur[i],
                        libel_appli_1 : libel_Donnees[i].replace(/ /g, ''),
                        libel_appli_2 : "",
                        libel_Donnees : "",
                        Code_Question : Code_Question,
                        Donnees: (tabDonnees[i] + '|').split('|')
                      }
                      z++;
                    }
                }
                return cb(questions)
            })
      },
      initEff : function (Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode) {
          $http.get('/api/getEffectifs', {
              params: {
              Code_Prestataire: Code_Prestataire,
              Code_Segment: Code_Segment,
              Code_SousSegment: Code_SousSegment,
              Code_TypePeriode: Code_TypePeriode,
              Code_Periode: Code_Periode
          }
          })
          .success(function(data1, status, headers, config) {
            try {
              $rootScope.selection.eff = data1[0].Resul;

            } catch (e) {console.log(e)}
          })
          .error(function(data, status, headers, config) {
              console.log ("error recuperation");
          });
      },
      initActionPlan : function (Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, cb) {
         console.log("ok")
          $http.get('/api/actionPlans', {
              params: {
              Code_Periode: Code_Periode,
              Code_Prestataire: Code_Prestataire,
              Code_Segment: Code_Segment,
              Code_SousSegment: Code_SousSegment,
              Code_TypePeriode: Code_TypePeriode
          }
          })
          .success(function(data, status, headers, config) {
              console.log(data)
              return cb(data[0], data[1])
          })
          .error(function(data, status, headers, config) {
              console.log ("error recuperation");
          });
      },   
      initTimeLineSynthese : function (questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_Type_periode, cb) {
            $http.get('/api/getTimeLineSyntheses', {
                params: {
                  codeTypeperiod: Code_Type_periode,
                  Code_Periode: Code_Periode,
                  Code_Prestataire: Code_Prestataire,
                  Code_Segment: Code_Segment,
                  Code_SousSegment: Code_SousSegment,
                  questions: questions,

            }
            })
            .success(function(data, status, headers, config) {
                try {
                    return cb(data);
                } catch(e) {
                    console.log(e);
                }
            })
            .error(function(data, status, headers, config) {
                console.log ("error recuperation");
            });
        },
        comparaison : function (tab1, tab2, nomColonne, segment) {
          //tab1 correspond au mois selectionner dans la liste deroulante
          //tab2 correspond au mois precedent au mois selection dans la liste deroulante
            var comp = [];
            var i = 0;

            for (var key = 1; key < tab1.length; key ++) {
              if (parseInt(tab2[key] - tab1[key]) < 0 )
                comp[i] ="-";
              else if (parseInt(tab2[key] - tab1[key]) == 0 )
                comp[i] = "==";
              else
                comp[i] = "+"
              i++;
            }
            if (segment == false) {
              $rootScope.selection.col.push({"colonne":tab1, "comparaison": comp, "segment" : []})
            } else {
              for (var key in $rootScope.selection.col) {
                if ($rootScope.selection.col[key].colonne[0] == $rootScope.lastColonne) {
                  $rootScope.selection.col[key].segment.push({"colonne":tab1, "comparaison": comp})
                }
              }
            }
        },
        colorLastColonne : function (indice) {
            eval("$rootScope.color" + indice + " = 'color: red;'");
        },
        builChartLine : function (Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, nomOnglet, indice, cb) {
            $http.get('/api/lineCharts', {
                params: {
                Code_Prestataire: Code_Prestataire,
                Code_Segment: Code_Segment,
                Code_SousSegment: Code_SousSegment,
                Code_TypePeriode: Code_TypePeriode,
                Code_Periode: Code_Periode
            }
          })
          .success(function(data, status, headers, config) {
            try {
                  eval('$rootScope.selection.' + nomOnglet + '.comparaison['+indice+'] = {}')
                  eval('$rootScope.selection.' + nomOnglet + '.comparaison['+indice+'].line = []')
                  var premierBF = '{"options":{"chart":{"type":"line","renderTo":"container"},"legend":{"enabled":true},"plotOptions":{"series":{"stacking":"line","pointPadding":0,"groupPadding":0},"bar":{"dataLabels":{"enabled":true,"color":"white"}}}},"series":[';
                  var premierBD = "";
                  var premierBDbis = "";
                  var deuxiemeBF = '],"title":{"text":""},"credits":{"enabled":false},"loading":false,"yAxis":{"title":{"text":null},"lineWidth":0,"minorGridLineWidth":0,"lineColor":"transparent","labels":{"enabled":false},"minorTickLength":0,"tickLength":0,"gridLineWidth":0},"xAxis":{categories: [';
                  var deuxiemeBD ='';
                  var troisiemeBF = '],"title":{"text":null},"lineWidth":0,"minorGridLineWidth":0,"lineColor":"transparent","labels":{"enabled":true},"minorTickLength":0,"tickLength":0}}';
                  
                  var test = '{"options":{"chart":{"type":"line","renderTo":"container"},"legend":{"enabled":true},"plotOptions":{"series":{"stacking":"line","pointPadding":0,"groupPadding":0},"bar":{"dataLabels":{"enabled":true,"color":"white"}}}},"series":[],"title":{"text":""},"credits":{"enabled":false},"loading":false,"yAxis":{"title":{"text":null},"lineWidth":0,"minorGridLineWidth":0,"lineColor":"transparent","labels":{"enabled":false},"minorTickLength":0,"tickLength":0,"gridLineWidth":0},"xAxis":{categories: [],"title":{"text":null},"lineWidth":0,"minorGridLineWidth":0,"lineColor":"transparent","labels":{"enabled":true},"minorTickLength":0,"tickLength":0}}'
                  var jsonLine = eval('(' + test + ')');
                  
                  var tab = [];
                  for (var i in data) {
                    if (data[i] != null)
                      tab[i] = data[i]
                  }
                  var tabValue = [];
                  for (var periode in tab) {
                    var ObjectByPeriod = tab[periode];
                    for (var q in ObjectByPeriod) {
                      var ObjectByQuestion = ObjectByPeriod[q]
                      if (!tabValue[q]) {
                        tabValue[q] = [];
                        jsonLine.series.push({name : ObjectByQuestion.libel, data : []})
                      }
                      jsonLine.series[q].data.push(ObjectByQuestion.valeur)
                    }
                    jsonLine.xAxis.categories.push($rootScope.getLibelofCodePeriodSynchrone(periode))
                  }
                return cb (jsonLine)
            } catch (e) {console.log(e)}
          })       
        },
        getActionPlan : function (Code_Pays, Code_Periode, Code_Segment, Code_Items, cb) {
            $http.get('/api/glasss', {
                params: {
                    Code_Pays: Code_Pays,
                    Code_Periode:  Code_Periode,
                    Code_Segment: Code_Segment,
                    Code_Items: Code_Items,
                    local: upVar.login.local
                }
            }).success(function(data, status, headers, config) {

                try {
                    var questions1 = [];
                    $rootScope.questions1 = questions1;
                    var questions2 = [];
                    $rootScope.questions2 = questions2;
                    var i = 0;
                    for (var y = 0; y < 5; y++) {
                        questions1[y] = data[i];
                        i++;
                    }
                    $rootScope.questions1 = questions1;
                    for (var y = 0; y < 5; y++) {
                        questions2[y] = data[i];
                        i++;
                    }
                    $rootScope.questions1 = questions2;
                    console.log($rootScope.questions1)
                    $rootScope.questions2 = questions1;
                    return cb()
                } catch (e) {
                    console.log(e);
                }
            })
          }
    };
  });
