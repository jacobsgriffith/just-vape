'use strict';

angular.module('justVapeApp').controller('JuiceQueueCtrl', ['$scope', '$http', 'Restangular', '$rootScope', function ($scope, $http, Restangular, $rootScope) {
	$scope.usersJuices = [];
	var juiceQueueRest = Restangular.all('juice/queue');
	juiceQueueRest.getList({userId: $rootScope.currentUser.Id}).then(function(juiceQueue) {
		$scope.usersJuices = [];
		angular.forEach(juiceQueue, function (value, key) {
			var t = value;
			t.EndTimeMilliseconds = new Date(t.EstimatedDeliveryDate).valueOf();
			this.push(t);
		}, $scope.usersJuices);
		$scope.$broadcast('timer-start');
	});
}]);