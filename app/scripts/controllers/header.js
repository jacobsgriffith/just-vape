'use strict';

angular.module('justVapeApp').controller('HeaderCtrl', ['$scope', '$rootScope', '$http', '$state', function ($scope, $rootScope, $http, $state) {
	$scope.previousStates = ['root'];
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		var indexOfToState = $scope.previousStates.indexOf(toState.name);
		if (indexOfToState != -1) {
			$scope.previousStates.splice(indexOfToState, $scope.previousStates.length - indexOfToState);
		}
		var indexOfFromState = $scope.previousStates.indexOf(fromState.name);
		if (indexOfFromState != -1) {
			$scope.previousStates.splice(indexOfFromState, $scope.previousStates.length - indexOfFromState);
		}
		if (indexOfToState == -1) {
			$scope.previousStates.push(fromState.name);
		}
	});
	$scope.goBack = function() {
		$state.go($scope.previousStates[$scope.previousStates.length - 1]);
	}
}]);
