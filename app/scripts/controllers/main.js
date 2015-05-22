'use strict';

/**
 * @ngdoc function
 * @name fadboardAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fadboardAppApp
 */
angular.module('fadboardAppApp').controller('MainCtrl', ['$scope', '$state', function ($scope, $state) {
    if ($scope.currentUser) {
		 navigator.notification.confirm('Do you want to quit?', function(button) {
			if(button == "1"){
				navigator.app.exitApp(); 
			} else {
				$state.go('dashboard');
			}
		 }, 'Exit', 'OK,Cancel');
	}
}]);
