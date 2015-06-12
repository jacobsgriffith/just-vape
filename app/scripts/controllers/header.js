'use strict';

angular.module('justVapeApp').controller('HeaderCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.title = 'Dashboard';
	$scope.previousState = 'home';
	$scope.goBack = function() {
		$state.go($scope.previousState);
	}
}]);
