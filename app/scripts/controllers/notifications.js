'use strict';

/**
 * @ngdoc function
 * @name fadboardAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fadboardAppApp
 */
angular.module('fadboardAppApp').controller('NotificationsCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.notifications = [];
	$http.get('http://fadboard.com/AppManager/api/notifications/').success(function(data) {
		if (data) {
			$scope.notifications = data;
		}
	});
}]);
