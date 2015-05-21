'use strict';

var _ = require('lodash');
var mysql = require('mysql');
var databaseMySQL = require('../databaseMySQL.js')();
// Get list of loyalty_payss

function getLibelOfCodePeriode (Code_Periode, key, cb) {
    var Periode_Libel = [];
     Periode_Libel['0'] = "Full Year";    
     Periode_Libel['1'] = "January";    
     Periode_Libel['2'] = "February";    
     Periode_Libel['3'] = "March";    
     Periode_Libel['4'] = "April";    
     Periode_Libel['5'] = "May";    
     Periode_Libel['6'] = "June";    
     Periode_Libel['7'] = "Juily";    
     Periode_Libel['8'] = "Aout";    
     Periode_Libel['9'] = "September";    
     Periode_Libel['10'] = "October";    
     Periode_Libel['11'] = "November";    
     Periode_Libel['12'] = "December";

    var tmp = parseInt(Code_Periode.toString().split('')[2] + Code_Periode.toString().split('')[3]);
    return cb(Periode_Libel[tmp], key)
}
function ObjectToArray (object, cb) {
  var clean = [];
  var i = 0;

  for (var x in object) {
    clean[i] = object[x].mois;
    i++;
  }
  return cb(clean)
}
function buildColonne(mySqlClient, query, Periode_Libel, key, cb) {
	mySqlClient.query(query, function select(error, results, fields) {
		if (error) {
			console.log(error);			
		} else  {
			ObjectToArray(results, function (clean) {
				clean = clean.reverse()
				if (clean[0])
					clean[0] = parseInt(clean[0] / 100)
				return cb(Periode_Libel, clean, key);
			})
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
	var query = 'select codePeriod  from table_periode where codeTypeperiod = ' + req.query.codeTypeperiod +' and codePeriod <= ' + req.query.Code_Periode +' ORDER BY table_periode.codePeriod DESC limit 6;';
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
			var TabQuery = [];
	        var i = 0;
	        for (var periode in results) {

	          for (var question in questions) {
	          	var modifier = JSON.parse(questions[question])
	            if (question == 0)
	              TabQuery[i] = '(SELECT ROUND((resul * 100),0) as "mois" from base where code_prestataire = "'+req.query.Code_Prestataire+'" and Code_segment = "'+req.query.Code_Segment+'" and code_sub_segment = "'+req.query.Code_SousSegment+'" and code_type_periode = "'+req.query.codeTypeperiod+'" and code_periode = "'+results[periode].codePeriod+'" and code_question = "'+modifier.Code_Question+'" and indicateur = "'+modifier.indicateur+'" limit 1)';
	            else
	              TabQuery[i] = 'SELECT ROUND((resul * 100),0) as "mois" from base where code_prestataire = "'+req.query.Code_Prestataire+'" and Code_segment = "'+req.query.Code_Segment+'" and code_sub_segment = "'+req.query.Code_SousSegment+'" and code_type_periode = "'+req.query.codeTypeperiod+'" and code_periode = "'+results[periode].codePeriod+'" and code_question = "'+modifier.Code_Question+'" and indicateur = "'+modifier.indicateur+'"' + " union all " + TabQuery[i];
	          }                      
	            i++;
	        }
	        var resultat = [];


	        for (var key in TabQuery) {
	          getLibelOfCodePeriode(results[key].codePeriod, key, function (Periode_Libel, key) {
	            buildColonne(mySqlClient, TabQuery[key], Periode_Libel, key, function (Periode_Libel, clean, key) {
		            if (key == TabQuery.length - 1) {
		              	resultat.push({id: key, nom: Periode_Libel, col : clean})
						res.json(resultat.reverse());		        
						mySqlClient.end();    	
		            }
					else {
		              resultat.push({id: key, nom: Periode_Libel, col : clean})
		          	}
	            })
	          })
	      	}
		}
	});

  
  
};



