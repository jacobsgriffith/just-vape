'use strict';

/**
 * @ngdoc function
 * @name justVapeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the justVapeApp
 */
angular.module('justVapeApp').controller('MainCtrl', ['$scope', '$state', function ($scope, $state) {
    if ($scope.currentUser) {
		if (!navigator || !navigator.notification) {
			$state.go('root.dashboard');
		} else {
			navigator.notification.confirm('Do you want to quit?', function(button) {
				if (button == "1") {
					navigator.app.exitApp(); 
				} else {
					$state.go('root.dashboard');
				}
			}, 'Exit', 'OK,Cancel');
		 }
	}
}]);
