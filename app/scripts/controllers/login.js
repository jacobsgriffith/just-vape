'use strict';

angular.module('justVapeApp').controller('LoginModalCtrl', function ($scope, UsersApi, $state) {
	this.cancel = $scope.$dismiss;
	this.submit = function (email, password) {
		UsersApi.login(email, password).then(function (user) {
			$scope.$close(user);
		});
	};
	
	this.gotoRegister = function() {
		this.cancel();
		$state.go('root.register');
	}
});