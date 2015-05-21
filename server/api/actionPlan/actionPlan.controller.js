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
function good(mySqlClient, query, cb) {
	mySqlClient.query(query, function select(error, results, fields) {
		if (error) {
			console.log(error);			
		} else  {
			return cb(results)
		}
	})
}
function bad(mySqlClient, query, cb) {
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
	var query = 'select codePeriod  from table_periode where codeTypeperiod = ' + req.query.codeTypeperiod +' and codePeriod <= ' + req.query.Code_Periode +' ORDER BY table_periode.codePeriod DESC limit 6;';
	console.log("---------");
	console.log("QUERY");
	console.log(query);
	console.log("----------");
    var queryGood = 'select table_questions.libel_appli_1,  ROUND(base.resul * 100, 0) as "resul" from base, table_questions where base.Code_Question = table_questions.Code_Question and base.indicateur = "p6" and base.code_periode = "'+ req.query.Code_Periode+'" and base.code_prestataire = "'+ req.query.Code_Prestataire+'" and base.code_segment = "'+ req.query.Code_SousSegment+'" and base.code_sub_segment = "'+ req.query.Code_SousSegment+'" and Pts_fort_faible =  1 order by resul desc limit 5';
    var queryBad = 'select table_questions.libel_appli_1,  ROUND(base.resul * 100, 0) as "resul" from base, table_questions where base.Code_Question = table_questions.Code_Question and base.indicateur = "p6" and base.code_periode = "'+ req.query.Code_Periode+'" and base.code_prestataire = "'+ req.query.Code_Prestataire+'" and base.code_segment = "'+ req.query.Code_SousSegment+'" and base.code_sub_segment = "'+ req.query.Code_SousSegment+'" and Pts_fort_faible =  1 order by resul ASC limit 5';
    var resultat = [];
    good(mySqlClient, queryGood, function (good) {
	    bad(mySqlClient, queryGood, function (bad) {
	    	resultat[0] = good;
	    	resultat[1] = bad;
	    	res.json(resultat);
	    	mySqlClient.end();
	    })
    })
  
  
};



