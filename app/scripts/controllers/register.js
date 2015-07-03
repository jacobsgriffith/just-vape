'use strict';

angular.module('justVapeApp').controller('RegisterCtrl', function ($scope, Restangular, $rootScope, $state) {
	$scope.firstName;
	$scope.lastName;
	$scope.email;
	$scope.password;
	
	$scope.submitRegistration = function() {
		var userRest = Restangular.all('user/register');
		userRest.post({
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			email: $scope.email,
			password: $scope.password
		}).then(function(user) {
			$rootScope.currentUser = user;
			$state.go('root.dashboard');
		});
	}
});