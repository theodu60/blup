'use strict';

var _ = require('lodash');
var mysql = require('mysql');
var databaseMySQL = require('../databaseMySQL.js')();

function getCodePeriode (mySqlClient, Code_TypePeriode, Code_Periode, cb) {
	var query = 'select codePeriod from table_periode where codeTypeperiod = ' + Code_TypePeriode +' and codePeriod <= ' + Code_Periode +' ORDER BY table_periode.codePeriod DESC limit 6;';
	mySqlClient.query(query, function select(error, results, fields) {
		if (error)
			console.log(error);
		else {
			var tab = [];
			for (var i in results) {
				tab[i] = results[i].codePeriod
			}
			return cb(tab)	
		}

	});
}
function getCodeQuestion(mySqlClient, cb) {
	var query = 'select Code_Question, libel_appli_1 from table_questions where onglet = 7 and Code_Question != 1 ORDER BY ORDRE asc;';
	mySqlClient.query(query, function select(error, results, fields) {
		if (error)
			console.log(error);
		else {
			var Question = [{
				code: "",
				libel: ""
			}];
			for (var i in results) {
				Question[i] = {
					code: results[i].Code_Question,
					libel: results[i].libel_appli_1
				}
			}
			return cb(Question)				
		}
	});
}
function getValue (mySqlClient, query,i, y, tabLine, tableauDate, ObjectQuestion, cb) {
	mySqlClient.query(query, function select(error, results, fields) {
		if (error)
			console.log(error);
		else {
			var valeur = results[0].resul;
			var codePeriod = results[0].codePeriod;

			tabLine[tableauDate[i]].push({
				libel : ObjectQuestion[y].libel,
				code : ObjectQuestion[y].code,
				valeur : valeur
			})
			return cb(i, y)		
		}
	});
}
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
var tabLine = []
	getCodePeriode(mySqlClient, req.query.Code_TypePeriode, req.query.Code_Periode, function (tableauDate) {
		getCodeQuestion(mySqlClient, function (ObjectQuestion) {
			for (var i in tableauDate) {
				tabLine[tableauDate[i]] = []
				for (var y in ObjectQuestion) {
					var query = '(SELECT sum(ROUND((a.resul * 100),0) + ROUND((b.resul * 100),0)) as "resul", a.code_periode as "codePeriod" from base as a JOIN base as b WHERE  a.code_prestataire = "'+req.query.Code_Prestataire+'" and  a.Code_segment = "'+req.query.Code_Segment+'" and  a.code_sub_segment = "'+req.query.Code_SousSegment+'" and  a.code_type_periode = "'+req.query.Code_TypePeriode+'" and  a.code_periode = "'+tableauDate[i]+'" and a.indicateur = "P1" and a.Code_Question = "'+ObjectQuestion[y].code+'" and b.code_prestataire = a.code_prestataire and b.Code_segment = a.Code_segment and b.code_sub_segment = a.code_sub_segment and b.code_type_periode = a.code_type_periode and b.code_periode = a.code_periode and b.indicateur = "P2" and b.Code_Question = a.Code_Question);';
					getValue(mySqlClient, query, i, y, tabLine, tableauDate, ObjectQuestion, function(i, y) {
						if ((i == tableauDate.length - 1 ) && (y == ObjectQuestion.length - 1)) {
							mySqlClient.end();
							res.json(tabLine)

						}
					})
				}
			}

		})
	})
};


