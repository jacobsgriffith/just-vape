'use strict';

angular.module('justVapeApp').controller('JuiceListCtrl', ['$scope', '$http', 'Restangular', '$rootScope', '$state', function ($scope, $http, Restangular, $rootScope, $state) {
	$scope.juices = [];
	var juiceRest = Restangular.all('juice/all');
	juiceRest.getList().then(function(juices) {
		$scope.juices = juices;
	});
	
	$scope.orderJuice = function(juice) {
		$state.go('root.orderjuice', {
			juiceId: juice.Id
		});
	}
}]);