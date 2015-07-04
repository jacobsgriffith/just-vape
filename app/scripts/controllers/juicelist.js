'use strict';

angular.module('justVapeApp').controller('JuiceListCtrl', ['$scope', '$http', 'Restangular', '$rootScope', '$state', '$timeout', function ($scope, $http, Restangular, $rootScope, $state, $timeout) {
	$scope.searchText;
	$scope.juices = [];
	$scope.categories = [];
	$scope.selectedCategory;
	
	$scope.slideTiming = 50;
	$scope.allCategorySlideIn = false;
	$timeout(function() {
		$scope.allCategorySlideIn = true;
	}, $scope.slideTiming);
	
	$scope.slideInCategory = function(category) {
		$scope.slideTiming += 50;
		$timeout(function() {
			category.slideIn = true;
		}, $scope.slideTiming);
	}
	
	$scope.slideOutCategory = function(category) {
		$scope.slideTiming += 50;
		$timeout(function() {
			if (category == 'All') {
				$scope.allCategorySlideIn = false;
			} else {
				category.slideIn = false;
			}
		}, $scope.slideTiming);
	}
	
	$scope.slideInJuice = function(juice) {
		$scope.slideTiming += 50;
		$timeout(function() {
			juice.slideIn = true;
		}, $scope.slideTiming);
	}
	
	var juiceRest = Restangular.all('juice/all');
	juiceRest.getList().then(function(juices) {
		$scope.juices = juices;
	});
	
	var juiceCategoriesRest = Restangular.all('juice/categories');
	juiceCategoriesRest.getList().then(function(juiceCategories) {
		$scope.categories = juiceCategories;
		for (var i = 0; i < $scope.categories.length; i++) {
			$scope.slideInCategory($scope.categories[i]);
		}
	});
	
	$scope.selectCategory = function(category) {
		$scope.slideTiming = 0;
		$scope.slideOutCategory(category);
		for (var i = 0; i < $scope.categories.length; i++) {
			$scope.slideOutCategory($scope.categories[i]);
		}
		if (category == 'All') {
			$timeout(function() {
				$scope.selectedCategory = category;
			}, $scope.categories.length * 50);
		} else {
			$scope.slideOutCategory('All');
			$timeout(function() {
				$scope.selectedCategory = category.Name;
			}, $scope.categories.length * 50);
		}
	}
	
	$scope.unselectCategory = function() {
		$scope.selectedCategory = null;
		$scope.allCategorySlideIn = true;
		for (var i = 0; i < $scope.categories.length; i++) {
			$scope.categories[i].slideIn = true
		}
	}
	
	$scope.orderJuice = function(juice) {
		$state.go('root.orderjuice', {
			juiceId: juice.Id
		});
	}
}]).filter('juiceFilter', function() {
	return function(items, selectedCategory, searchText) {
		var filtered = [];
		angular.forEach(items, function(item) {		
			if (selectedCategory == 'All' || selectedCategory == item.Category.Name) {
				if (!searchText || item.Name.toLowerCase().indexOf(searchText.toLowerCase()) != -1) {
					filtered.push(item);
				}
			}
		});
		return filtered;
	};
});