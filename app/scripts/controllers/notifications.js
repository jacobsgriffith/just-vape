'use strict';

angular.module('fadboardAppApp').controller('NotificationsCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.notifications = [];
	$http.get('http://fadboard.com/AppManager/api/notifications/').success(function(data) {
		if (data) {
			$scope.notifications = data;
		}
	});
}]);