'use strict';

angular.module('justVapeApp').controller('LoginModalCtrl', function ($scope, UsersApi) {
	this.cancel = $scope.$dismiss;
	this.submit = function (userName, password) {
		UsersApi.login(userName, password).then(function (user) {
			$scope.$close(user);
		});
	};
});