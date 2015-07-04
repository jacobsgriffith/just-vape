'use strict';
/*angular.module('justVapeApp')
  .service('CordovaReady', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
});*/

angular.module('justVapeApp').factory("UsersApi", ['$q', '$http', 'Restangular', 'spinnerService', function($q, $http, Restangular, spinnerService) {
	function _login(email, password) {
		spinnerService.show('loginSpinner');
		var deferred = $q.defer();
		var userRest = Restangular.all('user/login');
		userRest.post({
			email: email,
			password: password
		}).then(function(user) {
			if (user) {
				deferred.resolve(user);
			} else {
				deferred.reject();
			}
			spinnerService.hide('loginSpinner');
		}, function() {
			deferred.reject();
			spinnerService.hide('loginSpinner');
		});
		return deferred.promise;
	}
	return {
		login: _login
	};
}]);