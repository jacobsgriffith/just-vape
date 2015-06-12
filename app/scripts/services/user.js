'use strict';
/*angular.module('justVapeApp')
  .service('CordovaReady', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
});*/

angular.module('justVapeApp').factory("UsersApi", ['$q', '$http', function($q, $http) {
	function _login(userName, password) {
		var deferred = $q.defer();
		$http.post('http://localhost:3370/user/login', {
			userName: userName,
			password: password
		}).success(function(data, status, headers, config) {
			if (data) {
				deferred.resolve(data);
			} else {
				deferred.reject();
			}
		}).error(function(data, status, headers, config) {
			deferred.reject();
		});
		return deferred.promise;
	}
	return {
		login: _login
	};
}]);