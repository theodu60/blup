"use strict";angular.module("fdjApp").controller("IndicateursClefsCtrl",function(upVar,upThis,$http,$rootScope,$timeout){function initMaster(){$rootScope.initAnnee(function(){$rootScope.initMois(function(){$rootScope.initPrestataire1(function(){$rootScope.initPrestataire2(function(){$rootScope.initSegment(function(e){$rootScope.initSousSegment(e,function(){$rootScope.buildCheckboxPanel(function(){$rootScope.currentTpl="/tpl.html",updateData()})})})})})})})}function updateData(){$rootScope.onglet=2;var onglet=$rootScope.onglet,Code_Periode=upVar.periode.mois.Code_Mois,Code_Prestataire=upVar.prestataire.res.Code_Prestataire,Code_Segment=upVar.segmentation.segment.Code_Segment,Code_SousSegment=upVar.segmentation.sous_segment.Code_Sous_Seg,tmp=parseInt(Code_Periode.toString().split("")[2]+Code_Periode.toString().split("")[3]);if(0==tmp)var Code_TypePeriode=1;else var Code_TypePeriode=2;var Global="Global",prestataire1=$rootScope.selection.prestataire_value1.Prestataire_Libel.toString().replace(" ",""),prestataire2=$rootScope.selection.prestataire_value2.Prestataire_Libel.toString().replace(" ",""),segment=$rootScope.selection.segment_value.Segment_Libel.toString().replace(" ",""),sousSegment=$rootScope.selection.sous_segment_value.Sous_Seg_Libel.toString().replace(" ",""),nomOnglet="indicateursClefs";eval("$rootScope.selection."+nomOnglet+" = []"),eval("$rootScope.selection."+nomOnglet+".comparaison = []"),$rootScope.updateView(onglet,upVar.onglet.comparaison,upVar.onglet.evolution,upVar.onglet.view_value),$rootScope.updateCase(prestataire1,prestataire2,segment,sousSegment,Global),upThis.initEff(Code_Periode,Code_Prestataire,Code_Segment,Code_SousSegment,Code_TypePeriode),upThis.initQuestion(onglet,function(questions){$rootScope.questions=questions,1==upVar.onglet.comparaison?1==upVar.onglet.view_value?$rootScope.updateComparateur(onglet,Code_Periode,Code_Prestataire,Code_Segment,Code_SousSegment,Code_TypePeriode,prestataire1,prestataire2,segment,sousSegment,Global,questions,nomOnglet,0,function(tableau_Periode_Selectionne){for(var indice in tableau_Periode_Selectionne){var referencePeriodeSelectionne=tableau_Periode_Selectionne[indice].col,referencePeriodePrecedente=[],evo=$rootScope.comparaison(referencePeriodeSelectionne,referencePeriodePrecedente),nom=tableau_Periode_Selectionne[indice].nom;eval("$rootScope.selection."+nomOnglet+".comparaison[0].tab.push({nom:nom, col:referencePeriodeSelectionne, evo:evo})")}$rootScope.checkboxModel.length>0&&($rootScope.templateCasCheck3=!1,$rootScope.templateCasCheck4=!1,angular.forEach($rootScope.checkboxModel,function(value,i){var Code_Segment=value.split("|")[0],Code_SousSegment=value.split("|")[2],segment=value.split("|")[1],sousSegment=value.split("|")[3];$rootScope.updateComparateur(onglet,Code_Periode,Code_Prestataire,Code_Segment,Code_SousSegment,Code_TypePeriode,prestataire1,prestataire2,segment,sousSegment,Global,questions,nomOnglet,parseInt(i+1),function(tableau_Periode_Selectionne){for(var indice in tableau_Periode_Selectionne){var referencePeriodeSelectionne=tableau_Periode_Selectionne[indice].col,referencePeriodePrecedente=[],evo=$rootScope.comparaison(referencePeriodeSelectionne,referencePeriodePrecedente),nom=tableau_Periode_Selectionne[indice].nom;eval("$rootScope.selection."+nomOnglet+".comparaison["+parseInt(i+1)+"].tab.push({nom:nom, col:referencePeriodeSelectionne, evo:evo})")}})}))}):($rootScope.loading=!0,$rootScope.updateComparateurBar(onglet,Code_Periode,Code_Prestataire,Code_Segment,Code_SousSegment,Code_TypePeriode,prestataire1,prestataire2,segment,sousSegment,Global,questions,nomOnglet,0,upVar.question.Code_Question,function(){$rootScope.checkboxModel.length>0&&($rootScope.loading=!0,angular.forEach($rootScope.checkboxModel,function(value,i){var Code_Segment=value.split("|")[0],Code_SousSegment=value.split("|")[2],segment=value.split("|")[1],sousSegment=value.split("|")[3],nom="-------- "+sousSegment;$rootScope.buildChart(parseInt(i+1),nomOnglet,onglet,upVar.question.Code_Question,Code_Periode,Code_Prestataire,Code_Segment,Code_SousSegment,Code_TypePeriode,function(chartConfig,Moyenne,P6){eval("$rootScope.selection."+nomOnglet+'.comparaison[0].bar.push({nom:nom, chartConfig:chartConfig, Moyenne:Moyenne, P6:P6, niveau: "niveau4"})'),$rootScope.loading=!1})})),$rootScope.loading=!1})):($rootScope.loading=!0,upThis.initTimeLineSynthese(questions,Code_Periode,Code_Prestataire,Code_Segment,Code_SousSegment,Code_TypePeriode,function(TableauEnEvolution){eval("$rootScope.selection."+nomOnglet+".evolution6Mois = [];"),eval("$rootScope.selection."+nomOnglet+".evolution6Mois = TableauEnEvolution;"),$rootScope.loading=!1}))})}$rootScope.slides=[{titre:"INDICATEURS CLEFS",subtitre:"SATISFACTION GLOBALE",index:"1"},{titre:"INDICATEURS CLEFS",subtitre:"RESOLUTION DE LA DEMANDE",index:"2"},{titre:"INDICATEURS CLEFS",subtitre:"RECOMMANDATION",index:"3"},{titre:"INDICATEURS CLEFS",subtitre:"CES - CUSTOMER EFFORT SCORE",index:"4"}],$rootScope.indexSlider=0,$rootScope.carouselCtrl={},$rootScope.decrementerIndex=function(){var nomOnglet="indicateursClefs";$rootScope.indexSlider>0?$rootScope.indexSlider--:$rootScope.indexSlider=3,0==$rootScope.indexSlider&&(upVar.question.Code_Question=3),1==$rootScope.indexSlider&&(upVar.question.Code_Question=8),2==$rootScope.indexSlider&&(upVar.question.Code_Question=11),3==$rootScope.indexSlider&&(upVar.question.Code_Question=13),eval("$rootScope.selection."+nomOnglet+".comparaison[0].bar = []"),updateData()},$rootScope.incrementerIndex=function(){var nomOnglet="indicateursClefs";$rootScope.indexSlider<3?$rootScope.indexSlider++:$rootScope.indexSlider=0,0==$rootScope.indexSlider&&(upVar.question.Code_Question=3),1==$rootScope.indexSlider&&(upVar.question.Code_Question=8),2==$rootScope.indexSlider&&(upVar.question.Code_Question=11),3==$rootScope.indexSlider&&(upVar.question.Code_Question=13),eval("$rootScope.selection."+nomOnglet+".comparaison[0].bar = []"),updateData()},$rootScope.updateData=function(){updateData()},initMaster()});