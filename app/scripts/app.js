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
	]).config(function (/*$routeProvider, */$compileProvider, $stateProvider, $httpProvider, $urlRouterProvider) {
	
		$stateProvider
		.state('dashboard', {
			url: "/dashboard",
			templateUrl: "views/dashboard.html",
			controller: 'DashboardCtrl',
			data: {
				requireLogin: true
			}
		})
		.state('about', {
			url: "/about",
			templateUrl: "views/about.html",
			controller: 'AboutCtrl',
			data: {
				requireLogin: true
			}
		})
		.state('main', {
			url: "/main",
			templateUrl: "views/main.html",
			controller: 'MainCtrl',
			data: {
				requireLogin: false
			}
		});
		$urlRouterProvider.otherwise('/main');
	
		/*$routeProvider.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		}).when('/about', {
			templateUrl: 'views/about.html',
			controller: 'AboutCtrl'
		}).otherwise({
			redirectTo: '/'
		});*/

		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

		/*$stateProvider.state('welcome', {
			url: '/welcome',
			data: {
				requireLogin: false
			}
		}).state('app', {
			abstract: true,
			data: {
				requireLogin: true // this property will apply to all children of 'app'
			}
		})
		.state('app.dashboard', {
		// child state of `app`
		// requireLogin === true
		})*/
		
		
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
				$state.go('dashboard');
				deferred.reject(rejection);
			  });

			return deferred.promise;
		  }
		};
	  });
		
	}).run(function ($rootScope, $state, loginModal) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
		var requireLogin = toState.data.requireLogin;
		if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
				event.preventDefault();
				loginModal().then(function () {
					return $state.go(toState.name, toParams);
				}).catch(function () {
					return $state.go('dashboard');
				});
			}
		});
	});
