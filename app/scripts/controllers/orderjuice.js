'use strict';

/**
 * @ngdoc function
 * @name justVapeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the justVapeApp
 */
angular.module('justVapeApp').controller('OrderJuiceCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Restangular', function ($scope, $rootScope, $state, $stateParams, Restangular) {
	$scope.cardMessage = 'Add your card to be able to purchase juice through our app. Once purchased, come into Just Vape and we will have your juice ready for you!';
	$scope.juice = [];
	$scope.showAddCard = false;
	$scope.cardNumber;
	$scope.cardExpMonth;
	$scope.cardExpYear;
	$scope.cardCode;
	$scope.cardType;
	var juiceRest = Restangular.one('juice', $stateParams.juiceId);
	juiceRest.get().then(function(juice) {
		$scope.juice = juice;
	});
	
	$scope.addCard = function() {
		$scope.showAddCard = true;
	}
	
	$scope.addCardSubmit = function() {
		$scope.showAddCard = false;
		Restangular.one('user').post('addcard', {
			userId: $rootScope.currentUser.Id,
			cardNumber: $scope.cardNumber,
			cardExpMonth: $scope.cardExpMonth,
			cardExpYear: $scope.cardExpYear,
			cardCode: $scope.cardCode
		}).then(function(msg) {
			$scope.showAddCard = false;
		});
	}
	
	$scope.purchase = function() {
		if ($rootScope.currentUser.ProfileId) {
			Restangular.one('user/purchasejuice').post({
				userId: $rootScope.currentUser.Id,
				juiceId: $scope.juice.Id
			}).then(function(msg) {
				if (msg == 'card expired') {
					$rootScope.currentUser.ProfileId = null;
					$scope.cardMessage = 'Your card has expired, please add an updated card and then press Purchse again';
				}
			});
		}
	}
}]);
