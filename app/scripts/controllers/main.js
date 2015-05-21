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
		document.addEventListener("backbutton", function () { 
			 navigator.notification.confirm(
				 'Do you want to quit?', 
				 onConfirmQuit, 
				 'Exit', 
				 'OK,Cancel'  
			 );
		 }, true);
		 
		function onConfirmQuit(button){
			if(button == "1"){
				navigator.app.exitApp(); 
			}
		}
	}
}]);
