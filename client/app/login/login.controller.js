'use strict';

angular.module('fdjApp')
  .controller('LoginCtrl', function ($rootScope, $http, $location, upVar) {	
	 var tmp_data = {};

	 upVar.login = {};
$rootScope.login = function (email, mdp) {
	var query = "SELECT * FROM user where email ='" + email + "' and mdp='" + CryptoJS.SHA1(mdp).toString() + "';";
	$http.get('/api/querys', {params: {query : query}
	}).success(function(data, status, headers, config) {		
		try {	
				if (data[0]["token"]) {
				upVar.login = data[0];
				$location.url('/main')
				} else {
					alert("Error: Wrong Username or/and Password");
				}
			}
		catch (e) {
				console.log(e);
			}
	})

}

});
