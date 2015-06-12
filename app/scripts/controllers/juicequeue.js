'use strict';

angular.module('justVapeApp').controller('JuiceQueueCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.usersJuices = [];
	$http.get('http://localhost:3370/juice/queue').success(function(data) {
		$scope.usersJuices = [];
		angular.forEach(data, function (value, key) {
			var t = value;
			t.EndTimeMilliseconds = new Date(t.EstimatedDeliveryDate).valueOf();
			this.push(t);
		}, $scope.usersJuices);
		$scope.$broadcast('timer-start');
	});
}]);