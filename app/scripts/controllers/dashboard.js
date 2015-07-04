'use strict';

/**
 * @ngdoc function
 * @name justVapeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the justVapeApp
 */
angular.module('justVapeApp').controller('DashboardCtrl', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {
	$scope.rootjuicelist = false;
	$scope.rootjuicequeue = false;
	$scope.rootmanagejuice = false;
	$scope.rootusersjuices = false;
	$scope.rootaboutus = false;
	$timeout(function() {
		$scope.rootjuicelist = true;
	}, 100);
	$timeout(function() {
		$scope.rootjuicequeue = true;
	}, 200);
	$timeout(function() {
		$scope.rootmanagejuice = true;
	}, 300);
	$timeout(function() {
		$scope.rootusersjuices = true;
	}, 400);
	$timeout(function() {
		$scope.rootaboutus = true;
	}, 500);
	
	$scope.navigateTo = function(state) {
		$scope[state.replace('.', '')] = false;
		$timeout(function() {
			$scope.rootjuicelist = false;
		}, 200);
		$timeout(function() {
			$scope.rootjuicequeue = false;
		}, 300);
		$timeout(function() {
			$scope.rootmanagejuice = false;
		}, 400);
		$timeout(function() {
			$scope.rootusersjuices = false;
		}, 500);
		$timeout(function() {
			$scope.rootaboutus = false;
		}, 600);
		$timeout(function() {
			$state.go(state);
        }, 600);
	}
}]);
