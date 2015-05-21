'use strict';

var _ = require('lodash');
var mysql = require('mysql');
var databaseMySQL = require('../databaseMySQL.js')();
// Get list of loyalty_payss
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
	var query = 'SELECT Resul from base where code_prestataire = "'+req.query.Code_Prestataire+'" and Code_segment = "'+req.query.Code_Segment+'" and code_sub_segment = "'+req.query.Code_SousSegment+'" and code_type_periode = "'+req.query.Code_TypePeriode+'" and code_periode = "'+req.query.Code_Periode+'" and code_question = 1 and indicateur = "Eff" and Resul > 1;';
	console.log("---------");
	console.log("QUERY");
	console.log(query);
	console.log("----------");
	mySqlClient.query(query, function select(error, results, fields) {
		if (error)
			console.log(error);			
		else
			res.json(results);
		mySqlClient.end();
	});

  
  
};

