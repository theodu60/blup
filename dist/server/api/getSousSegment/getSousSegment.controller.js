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
        var query = 'SELECT Sous_Seg_Libel, Code_Sous_Seg FROM fdj.table_sous_segments where code_segment = '+req.query.Code_Segment+' order by Code_Sous_Seg asc;';
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



