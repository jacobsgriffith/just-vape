'use strict';

angular.module('justVapeApp').controller('UsersJuicesCtrl', ['$scope', '$http', 'Restangular', '$rootScope', function ($scope, $http, Restangular, $rootScope) {
	$scope.usersJuices = [];
	$scope.rateAndComment = false;
	$scope.rating;
	$scope.comment;
	
	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};
	
	var juiceQueueRest = Restangular.all('juice/usersjuices');
	
	$scope.saveRatingAndComment = function(usersJuice) {
		Restangular.one('juice').post('saveusersjuices', {
			Id: usersJuice.Id,
			Rating: usersJuice.Rating,
			Comment: usersJuice.Comment
		}).then(function() {
			usersJuice.rateAndComment = false;
		});
	}
	
	juiceQueueRest.getList({userId: $rootScope.currentUser.Id}).then(function(usersJuices) {
		$scope.usersJuices = usersJuices;
	});
}]);