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
	var selectQuery = req.query.query;
	console.log("---------");
	console.log("QUERY");
	console.log(selectQuery);
	console.log("----------");
	mySqlClient.query(selectQuery, function select(error, results, fields) {
		if (error)
			console.log(error);
		else if (results.length > 0)
			res.json(results);
		else
			res.json(results);
					mySqlClient.end();

	});

  
  
};
