'use strict';

var _ = require('lodash');
var mysql = require('mysql');
var databaseMySQL = require('../databaseMySQL.js')();

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
        var query = 'SELECT distinct SPLIT_STR(prestataire_libel,"|", 1) as "Prestataire_Libel" FROM fdj.table_prestataires where Code_prestataire != 99 order by code_prestataire ASC;';
	console.log("---------");
	console.log("QUERY");
	console.log(query);
	console.log("----------");

	var questions = req.query.questions
	mySqlClient.query(query, function select(error, results, fields) {
		if (error)
			console.log(error);			
		else
			res.json(results);
		mySqlClient.end();
	});

  
  
};



