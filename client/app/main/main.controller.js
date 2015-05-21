'use strict';

angular.module('fdjApp')
  .controller('MainCtrl', function ($rootScope, $http, upThis, upVar) {
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
//---------------------------------------//
//------------------HEADER---------------//
//---------------------------------------//
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

function namePlanAction () {
	$rootScope.selection.titrePlanAction = "";
	var prestataire1 = $rootScope.selection.prestataire_value1.Prestataire_Libel.toString().replace(" ", "");
	var prestataire2 = $rootScope.selection.prestataire_value2.Prestataire_Libel.toString().replace(" ", "");
	var segment = $rootScope.selection.segment_value.Segment_Libel.toString().replace(" ", "");
	var sousSegment = $rootScope.selection.sous_segment_value.Sous_Seg_Libel.toString().replace(" ", "") ;

	if ( prestataire1 != "Global") {
		$rootScope.selection.titrePlanAction = prestataire1;
	} 
	if ( prestataire2 != "Global") {
		$rootScope.selection.titrePlanAction = $rootScope.selection.titrePlanAction + " | " + prestataire2;
	} 
	if ( segment != "Global") {
		$rootScope.selection.titrePlanAction = $rootScope.selection.titrePlanAction + " | " + segment + " | " + sousSegment;
	} 
}
//---------------------------------------//
//-----------FONCTION PRINCIPAL-----------//
//---------------------------------------//
function updateData() {
  //--VARIABLE INITIALISER A CHAQUE UPDATE
  $rootScope.onglet = 1;
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

  var nomOnglet = 'synthesis'
  eval('$rootScope.selection.'+ nomOnglet + ' = []')
  eval('$rootScope.selection.'+ nomOnglet + '.comparaison = []')
  //---------------------------------------------
  $rootScope.updateView(onglet, upVar.onglet.comparaison, upVar.onglet.evolution, upVar.onglet.view_value)
  $rootScope.updateCase(prestataire1, prestataire2, segment, sousSegment, Global);
  upThis.initEff(Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode);
  upThis.initQuestion(onglet, function (questions) {
    $rootScope.questions = questions

    //MISE A JOUR DU TABLEAU EN EVOLUTION
    $rootScope.loading = true
    upThis.initTimeLineSynthese(questions, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, function (TableauEnEvolution) {
      eval('$rootScope.selection.' + nomOnglet + '.evolution6Mois = [];')
      eval('$rootScope.selection.' + nomOnglet + '.evolution6Mois = TableauEnEvolution;')
      $rootScope.loading = false
    })

    //MISE A JOUR DU COMPARATEUR
		$rootScope.updateComparateur(onglet, Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, prestataire1, prestataire2, segment, sousSegment, Global, questions, nomOnglet, 0, function (tableau_Periode_Selectionne) {
      for (var indice in tableau_Periode_Selectionne) {
        var referencePeriodeSelectionne = tableau_Periode_Selectionne[indice].col
        var referencePeriodePrecedente = []
        var evo = $rootScope.comparaison(referencePeriodeSelectionne, referencePeriodePrecedente)
        var nom = tableau_Periode_Selectionne[indice].nom
        eval('$rootScope.selection.' + nomOnglet + '.comparaison[0].tab.push({nom:nom, col:referencePeriodeSelectionne, evo:evo})')
      }
    })
    
    //MISE A JOUR DU PLAN D ACTION
		namePlanAction();
		upThis.initActionPlan(Code_Periode, Code_Prestataire, Code_Segment, Code_SousSegment, Code_TypePeriode, function (good, bad) {
				$rootScope.selection.planAction = [];
				for (var i = 0; i < good.length; i++) {		
					$rootScope.selection.planAction[i] = {
						QuestionGood: good[i].libel_appli_1,
						resulGood: good[i].resul,
						QuestionBad: bad[i].libel_appli_1,
						resulBad: bad[i].resul
					}
				}
		})

  })
}
//---------------------------------------------------------------------------//
//-----------FONCTION APPELLER LORS DU CHARGEMENT DE LA PAGE -----------//
//--------------------------------------------------------------------------//
  initMaster ();
});
