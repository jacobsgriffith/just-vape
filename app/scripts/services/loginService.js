'use strict';

angular.module('justVapeApp').service('loginModal', function ($modal, $rootScope) {
	function assignCurrentUser (user) {
		$rootScope.currentUser = user;
		return user;
	}
	
	return function() {
		var instance = $modal.open({
			animation: true,
			templateUrl: 'views/loginModalTemplate.html',
			controller: 'LoginModalCtrl',
			controllerAs: 'LoginModalCtrl',
			size: 'sm'
		});
		return instance.result.then(assignCurrentUser);
	};
});