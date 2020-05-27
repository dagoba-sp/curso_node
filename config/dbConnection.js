var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : 'localhost',
		user : 'daraujo',
		password : 'Ruan@1812',
		database : 'portal_noticias'
	});	
}

module.exports = function(){
	return connMySQL;
}