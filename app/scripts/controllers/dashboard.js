'use strict';

/**
 * @ngdoc function
 * @name fadboardAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fadboardAppApp
 */
angular.module('fadboardAppApp').controller('DashboardCtrl', ['$scope', '$state', function ($scope, $state) {
	$scope.navigateTo = function(state) {
		$state.go(state);
	}
}]);
