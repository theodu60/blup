'use strict';

var _ = require('lodash');
var mysql = require('mysql');
var databaseMySQL = require('../databaseMySQL.js')();
// Get list of loyalty_payss

function simpleQuery(mySqlClient, query, cb) {
	mySqlClient.query(query, function select(error, results, fields) {
		if (error) {
			console.log(error);			
		} else  {
			return cb(results)
		}
	})
}
exports.index = function(req, res) {
//-----------------------------------//
//                                   //
//    	Gestion Base de Données      //
//                                   //
//-----------------------------------//
	var mySqlClient = mysql.createConnection({
	  host    : databaseMySQL.host,
	  user    : databaseMySQL.user,
	  password  : databaseMySQL.password,
	  database  : databaseMySQL.database,
	  socketPath : databaseMySQL.socketPath
	});
	var query = 'select codePeriod  from table_periode where codeTypeperiod = ' + req.query.Code_TypePeriode +' and codePeriod <= ' + req.query.Code_Periode +' ORDER BY table_periode.codePeriod DESC limit 6;';
	console.log("---------");
	console.log("QUERY");
	console.log(query);
	console.log("----------");

	var questions = req.query.questions
	mySqlClient.query(query, function select(error, results, fields) {
		if (error) {
			console.log(error);			
		}
		else  {
	        var query = 'SELECT Donnees, libel_Donnees FROM fdj.table_questions where onglet = '+ req.query.onglet +' and Code_Question = '+req.query.Code_Question+';'
	        var tabColor = [];
	        var premierBout = '{"options":{"chart":{"type":"bar","backgroundColor":"transparent","margin":[0,0,0,0],"renderTo":"container"},"legend":{"enabled":false},"plotOptions":{"series":{"stacking":"normal","pointPadding":0,"groupPadding":0},"bar":{"dataLabels":{"enabled":true,"color":"white"}}}},"series":['
	        var dernierBout = '],"title":{"text":""},"credits":{"enabled":false},"loading":false,"size":{"width": 640, "height":"50"},"yAxis":{"title":{"text":null},"lineWidth":0,"minorGridLineWidth":0,"lineColor":"transparent","labels":{"enabled":false},"minorTickLength":0,"tickLength":0,"gridLineWidth":0},"xAxis":{"title":{"text":null},"lineWidth":0,"minorGridLineWidth":0,"lineColor":"transparent","labels":{"enabled":false},"minorTickLength":0,"tickLength":0}}';
	        var dynamicBout = "";
	          tabColor[0] = "#b5d0e0";
	          tabColor[1] = "#85b2cd";
	          tabColor[2] = "#5694b9";
	          tabColor[3] = "#21659b";
	        
	        mySqlClient.query(query, function select(error, results, fields) {
	          try {
	          	var data = results[0]
	          	var DonneesString = data.Donnees
	          	var libel_DonneesString = data.libel_Donnees
	            var Donnees = DonneesString.split('|')
	            var libel_Donnees = libel_DonneesString.split('|')

	            var effectif = null;
	            var TabQuery = [];
	            var z = 0;
	            Donnees = Donnees.reverse();

	            for (var i in Donnees) {
	              if (i == 0) 
	                TabQuery = '(SELECT SUM(IFNULL(resul, 0)) as "resul" from base where indicateur = "'+ Donnees[i]+'" and code_prestataire = "'+req.query.Code_Prestataire+'" and Code_segment = "'+req.query.Code_Segment+'" and code_sub_segment = "'+req.query.Code_SousSegment+'" and code_type_periode = "'+req.query.Code_TypePeriode+'" and code_periode = "'+req.query.Code_Periode+'" and code_question = '+req.query.Code_Question+' limit 1)'
	              else
	                TabQuery = '(SELECT SUM(IFNULL(resul, 0)) as "resul" from base where indicateur = "'+ Donnees[i]+'" and code_prestataire = "'+req.query.Code_Prestataire+'" and Code_segment = "'+req.query.Code_Segment+'" and code_sub_segment = "'+req.query.Code_SousSegment+'" and code_type_periode = "'+req.query.Code_TypePeriode+'" and code_periode = "'+req.query.Code_Periode+'" and code_question = '+req.query.Code_Question+' limit 1) union all ' + TabQuery
	            }

	            var TabAssociatif = [];
	            simpleQuery(mySqlClient, TabQuery, function (data) {
	              Donnees = Donnees.reverse();
	              for (var i in Donnees) {
	                TabAssociatif[Donnees[i]] = data[i].resul;
	              }
	              var z = 0;
	              for (var i in TabAssociatif) {
	                if ((i !== "MOYENNE") && (i !== "P6")) {
	                  if (TabAssociatif[i] == null)
	                    TabAssociatif[i] = 0;
	                  dynamicBout = dynamicBout + '{"data":['+Number((TabAssociatif[i]).toFixed(1)) * 100+'],"id":"series-'+z+'","name":"'+i+'","type":"bar","color":"'+tabColor[z]+'"},';
	                  z++;
	                }
	                
	              }

	              var chart = premierBout + dynamicBout + dernierBout;
	              var P6 = null;
	              var MOYENNE = null;
	              if (TabAssociatif["P6"])
	                P6 = TabAssociatif["P6"];
	              if (TabAssociatif["MOYENNE"])
	                MOYENNE = Math.round(TabAssociatif["MOYENNE"], 0)
	            	            console.log("---------------------")

	            var resultats = [];

	            resultats[0] = eval('(' + chart + ')');
	            resultats[1] = MOYENNE;
	            resultats[2] = Math.round(P6 * 100, 0);
	            
				res.json(resultats);
				mySqlClient.end();

	            //return cb (eval('(' + chart + ')'), MOYENNE, Math.round(P6 * 100, 0))
	            })
	          } catch (e) {console.log(e)}
	        })  
		}
	});

  
  
};



