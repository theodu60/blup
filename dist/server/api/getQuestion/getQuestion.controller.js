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
    var query = "select * from table_questions where onglet =" + req.query.onglet + " order by ordre;"
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

