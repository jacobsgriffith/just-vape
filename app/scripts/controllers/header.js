'use strict';

angular.module('fadboardAppApp').controller('HeaderCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.title = 'Dashboard';
	$scope.previousState = 'home';
	$scope.goBack = function() {
		$state.go($scope.previousState);
	}
}]);
