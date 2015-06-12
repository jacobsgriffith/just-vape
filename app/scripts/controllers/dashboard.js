'use strict';

/**
 * @ngdoc function
 * @name justVapeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the justVapeApp
 */
angular.module('justVapeApp').controller('DashboardCtrl', ['$scope', '$state', function ($scope, $state) {
	$scope.navigateTo = function(state) {
		$state.go(state);
	}
}]);
