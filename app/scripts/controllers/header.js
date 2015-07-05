'use strict';

angular.module('justVapeApp').controller('HeaderCtrl', ['$scope', '$rootScope', '$http', '$state', function ($scope, $rootScope, $http, $state) {
	$scope.previousStates = ['root'];
	$scope.previousStatesParams = [{
	}];
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		var indexOfToState = $scope.previousStates.indexOf(toState.name);
		if (indexOfToState != -1) {
			var howMany = $scope.previousStates.length - indexOfToState;
			$scope.previousStatesParams.splice(indexOfToState, howMany);
			$scope.previousStates.splice(indexOfToState, howMany);
		}
		var indexOfFromState = $scope.previousStates.indexOf(fromState.name);
		if (indexOfFromState != -1) {
			var howMany = $scope.previousStates.length - indexOfFromState;
			$scope.previousStatesParams.splice(indexOfFromState, howMany);
			$scope.previousStates.splice(indexOfFromState, howMany);
		}
		if (indexOfToState == -1) {
			$scope.previousStates.push(fromState.name);
			$scope.previousStatesParams.push(fromParams);
		}
	});
	$scope.goBack = function() {
		if ($scope.previousStatesParams[$scope.previousStates.length - 1]) {
			$state.go($scope.previousStates[$scope.previousStates.length - 1], $scope.previousStatesParams[$scope.previousStates.length - 1]);
		} else {
			$state.go($scope.previousStates[$scope.previousStates.length - 1]);
		}
	}
}]);
