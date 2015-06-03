var configuration = {
  host    : "127.0.0.1",
  user    : "root",
  password  : "root",
  database  : "fdj"
  //socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
}

module.server = function(){
	return configuration;
}