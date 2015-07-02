'use strict';

angular.module('justVapeApp').controller('JuiceListCtrl', ['$scope', '$http', 'Restangular', '$rootScope', '$state', function ($scope, $http, Restangular, $rootScope, $state) {
	$scope.searchText;
	$scope.juices = [];
	$scope.categories = [];
	$scope.selectedCategory;
	var juiceRest = Restangular.all('juice/all');
	juiceRest.getList().then(function(juices) {
		$scope.juices = juices;
	});
	
	var juiceCategoriesRest = Restangular.all('juice/categories');
	juiceCategoriesRest.getList().then(function(juiceCategories) {
		$scope.categories = juiceCategories;
	});
	
	
	$scope.orderJuice = function(juice) {
		$state.go('root.orderjuice', {
			juiceId: juice.Id
		});
	}
}]).filter('juiceFilter', function() {
	return function(items, selectedCategory, searchText) {
		var filtered = [];
		angular.forEach(items, function(item) {
			if (selectedCategory != 'All') {			
				if (searchText) {
					if (selectedCategory == item.Category.Name && item.Name.indexOf(searchText) != -1) {
						filtered.push(item);
					}
				} else {
					if (selectedCategory == item.Category.Name) {
						filtered.push(item);
					}
				}
			} else {
				if (searchText) {
					if (item.Name.indexOf(searchText) != -1) {
						filtered.push(item);
					}
				} else {
					filtered.push(item);
				}
			}
		});
		return filtered;
	};
});