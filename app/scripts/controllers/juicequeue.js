'use strict';

angular.module('justVapeApp').controller('JuiceQueueCtrl', ['$scope', '$http', 'Restangular', '$rootScope', function ($scope, $http, Restangular, $rootScope) {
	$scope.juiceQueues = [];
	var juiceQueueRest = Restangular.all('juice/queue');
	juiceQueueRest.getList({userId: $rootScope.currentUser.Id}).then(function(juiceQueues) {
		$scope.juiceQueues = [];
		angular.forEach(juiceQueues, function (value, key) {
			var t = value;
			t.EndTimeMilliseconds = new Date(t.EstimatedDeliveryDate).valueOf();
			this.push(t);
		}, $scope.juiceQueues);
		$scope.$broadcast('timer-start');
	});
	
	$scope.startMixing = function(juiceQueue) {
		juiceQueue.Done = false;
		juiceQueue.Mixing = true;
		juiceQueue.put();
	}
	
	$scope.doneMixing = function(juiceQueue) {
		juiceQueue.Done = true;
		juiceQueue.Mixing = false;
		juiceQueue.put();
	}
}]);