'use strict';
/*angular.module('fadboardAppApp')
  .service('CordovaReady', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
});*/

angular.module('fadboardAppApp').factory("UsersApi", ['$q', '$http', function($q, $http) {
	function _login(email, password) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: 'http://fadboard.com/cmsadmin/logintest.php',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
			},
			data: 'login_util=' + email + '&pass_util=' + password
			//responseType: 'arraybuffer'
		}).success(function(data, status, headers, config) {
		//$http.post('http://fadboard.com/cmsadmin/logintest.php', 'login_util=' + email + '&pass_util=' + password).success(function(data, status, headers, config) {
			if (data) {
				if (data.indexOf('true') != -1) {
					deferred.resolve({name: 'Admin'});
				} else {
					deferred.reject();
				}
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