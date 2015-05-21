'use strict';

var _ = require('lodash');
var mysql = require('mysql');
var databaseMySQL = require('../databaseMySQL.js')();
// Get list of loyalty_payss

function getSousSeg (mySqlClient, tableauSegment, i, cb) {
	var query = 'SELECT Sous_Seg_Libel, Code_Sous_Seg FROM fdj.table_sous_segments where Code_Segment = '+tableauSegment[i].Code_Segment+';'
	mySqlClient.query(query, function select(error, results, fields) {
		tableauSegment[i].sous_seg = [];
		tableauSegment[i].sous_seg = results;
		return cb (i)
	})
}
function getSegment (mySqlClient, cb) {
	var query = 'SELECT table_segments.Segment_Libel, table_segments.Code_Segment FROM table_segments where table_segments.Code_Segment != 99 and  table_segments.Code_Segment != 0 order by table_segments.Code_Segment';
	mySqlClient.query(query, function select(error, results, fields) {
		return cb(results)
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
	var CheckBoxPanel = {}
	getSegment(mySqlClient, function (tableauSegment) {
		for (var i = 0; i < tableauSegment.length; i++) {
			getSousSeg(mySqlClient, tableauSegment, i, function (i){
				console.log(i)
				console.log(tableauSegment.length)
				if (i == tableauSegment.length - 1) {
					mySqlClient.end();
					res.json(tableauSegment)
				}
			})
		}
	})

};








