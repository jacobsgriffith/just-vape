'use strict';
/*angular.module('fadboardAppApp')
  .service('CordovaReady', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
});*/

angular.module('fadboardAppApp').factory("UsersApi", ['$q', '$http', function($q, $http) {
	function _login(email, password) {
		var deferred = $q.defer();
		$http.post('http://fadboard.com/AppManager/api/login/', {
			email: email,
			password: password
		}).success(function(data, status, headers, config) {
			if (data == true) {
				$http.get('http://fadboard.com/AppManager/api/user/').success(function(data) {
					deferred.resolve(data);
				}).error(function(data, status, headers, config) {
					deferred.reject();
				});
			} else {
				deferred.reject();
			}
		}).error(function(data, status, headers, config) {
			deferred.reject();
		});
		return deferred.promise
	}
	return {
		login: _login
	};
}]);