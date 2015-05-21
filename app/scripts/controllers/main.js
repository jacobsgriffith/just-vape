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
		
		function onConfirm(buttonIndex) {
			alert('You selected button ' + buttonIndex);
		}

		// Show a custom confirmation dialog
		//
		function showConfirm() {
			navigator.notification.confirm(
				'You are the winner!', // message
				 onConfirm,            // callback to invoke with index of button pressed
				'Game Over',           // title
				['Restart','Exit']         // buttonLabels
			);
		}
	
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
		showConfirm();
	}
}]);
