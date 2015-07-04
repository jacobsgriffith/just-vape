'use strict';

angular.module('justVapeApp').controller('ManageJuiceCtrl', ['$modal', '$scope', '$http', 'Restangular', '$rootScope', '$state', function ($modal, $scope, $http, Restangular, $rootScope, $state) {
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
	
	$scope.addNewCategory = function() {
		$scope.categories.push({
			Id: -1,
			Name: "",
			editMode: true
		});
	}
	
	$scope.addNewJuice = function() {
		$scope.juices.push({
			Id: -1,
			Name: "",
			Description: "",
			Category: $scope.selectedCategory,
			editMode: true,
			expanded: true
		});
	}
	$scope.removeJuice = function(juice) {
		var instance = $modal.open({
			animation: true,
			templateUrl: 'views/deleteJuiceModalTemplate.html',
			controller: 'ManageJuiceCtrl',
			controllerAs: 'ManageJuiceCtrl',
			size: 'sm'
		}).result.then(function() {
			Restangular.one('juice').one('removeJuice', juice.Id).remove().then(function() {
				$scope.juices.splice($scope.juices.indexOf(juice), 1);
			});
		});
	}
	
	this.cancelRemoveJuice = $scope.$dismiss;
	this.submitRemoveJuice = function () {
		$scope.$close();
	};
	
	var juiceUpdateRest = Restangular.one('juice');
	$scope.updateJuiceCategory = function(category) {
		if (category.Id == -1) {
			juiceUpdateRest.post('saveJuiceCategory', category).then(function(savedCategory) {
				for (var i = 0; i < $scope.categories.length; i++) {
					if ($scope.categories[i].Name == category.Name) {
						$scope.categories[i] = savedCategory;
					}
				}
			});
		} else {
			juiceUpdateRest.one('updateJuiceCategory').customPUT(category).then(function() {
				category.editMode = false;
			});
		}
	}
	
	$scope.updateJuice = function(juice) {
		if (juice.Id == -1) {
			juiceUpdateRest.post('saveJuice', juice).then(function(savedJuice) {
				for (var i = 0; i < $scope.juices.length; i++) {
					if ($scope.juices[i].Name == juice.Name) {
						$scope.juices[i] = savedJuice;
					}
				}
			});
		} else {
			juiceUpdateRest.one('updateJuice').customPUT(juice).then(function(updatedJuice) {
				for (var i = 0; i < $scope.juices.length; i++) {
					if ($scope.juices[i].Id == updatedJuice.Id) {
						$scope.juices[i] = updatedJuice;
					}
				}
			});
		}
	}
}]).filter('manageJuiceFilter', function() {
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