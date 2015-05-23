'use strict';

/**
 * @ngdoc overview
 * @name fadboardAppApp
 * @description
 * # fadboardAppApp
 *
 * Main module of the application.
 */
angular
	.module('fadboardAppApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ui.bootstrap',
		'ui.router',
		'ngSanitize',
		'ngTouch'
	]).config(function ($compileProvider, $stateProvider, $httpProvider, $urlRouterProvider) {
		$stateProvider
		.state('root', {
			url: '',
			views: {
				'header': {
					templateUrl: 'views/header.html',
					controller: 'HeaderCtrl'
				},
				'footer': {
					templateUrl: 'views/footer.html'
				},
				'container': {
					templateUrl: 'views/container.html'
				}
			},
			data: {
				requireLogin: false,
				settings: {
				   displayName: 'Home'
			   }
			}
		})
		.state('root.dashboard', {
			url: "/dashboard",
			templateUrl: "views/dashboard.html",
			controller: 'DashboardCtrl',
			data: {
				requireLogin: true,
				settings: {
				   displayName: 'Dashboard'
			   }
			}
		})
		.state('root.notifications', {
			url: "/notifications",
			templateUrl: "views/notifications.html",
			controller: 'NotificationsCtrl',
			data: {
				requireLogin: true,
				settings: {
				   displayName: 'Notifications'
			   }
			}
		})
		.state('root.main', {
			url: "/main",
			templateUrl: "views/main.html",
			controller: 'MainCtrl',
			data: {
				requireLogin: false,
				settings: {
				   displayName: 'Home'
			   }
			}
		});
		$urlRouterProvider.otherwise('/main');
	
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
		
		$httpProvider.interceptors.push(function ($timeout, $q, $injector) {
		var loginModal, $http, $state;

		// this trick must be done so that we don't receive
		// `Uncaught Error: [$injector:cdep] Circular dependency found`
		$timeout(function () {
		  loginModal = $injector.get('loginModal');
		  $http = $injector.get('$http');
		  $state = $injector.get('$state');
		});

		return {
		  responseError: function (rejection) {
			if (rejection.status !== 401) {
			  return rejection;
			}

			var deferred = $q.defer();

			loginModal()
			  .then(function () {
				deferred.resolve( $http(rejection.config) );
			  })
			  .catch(function () {
				$state.go('root.dashboard');
				deferred.reject(rejection);
			  });

			return deferred.promise;
		  }
		};
	  });
	}).run(function ($rootScope, $state, loginModal) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
		if (toState.name == 'root') {
			event.preventDefault();
			$state.go('root.main');
		} else {
			var requireLogin = toState.data.requireLogin;
			if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
					event.preventDefault();
					loginModal().then(function () {
						return $state.go(toState.name, toParams);
					}).catch(function () {
						return $state.go('root.dashboard');
					});
				}
			}
		});
	});
