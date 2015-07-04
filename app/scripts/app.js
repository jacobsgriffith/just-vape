'use strict';

/**
 * @ngdoc overview
 * @name justVapeApp
 * @description
 * # justVapeApp
 *
 * Main module of the application.
 */
angular
	.module('justVapeApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ui.bootstrap',
		'ui.router',
		'ngSanitize',
		'ngTouch',
		'timer',
		'restangular',
		'credit-cards',
		'angularSpinners'
	]).config(function ($compileProvider, $stateProvider, $httpProvider, $urlRouterProvider, RestangularProvider) {
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
		.state('root.register', {
			url: "/register",
			templateUrl: "views/register.html",
			controller: 'RegisterCtrl',
			data: {
				requireLogin: false,
				settings: {
				   displayName: 'Register'
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
		.state('root.juicequeue', {
			url: "/juicequeue",
			templateUrl: "views/juicequeue.html",
			controller: 'JuiceQueueCtrl',
			data: {
				requireLogin: true,
				settings: {
				   displayName: 'Juice Queue'
			   }
			}
		})
		.state('root.managejuice', {
			url: "/managejuice",
			templateUrl: "views/managejuice.html",
			controller: 'ManageJuiceCtrl',
			data: {
				requireLogin: true,
				settings: {
				   displayName: 'Manage Juice'
			   }
			}
		})
		.state('root.juicelist', {
			url: "/juicelist",
			templateUrl: "views/juicelist.html",
			controller: 'JuiceListCtrl',
			data: {
				requireLogin: true,
				settings: {
				   displayName: 'Juice List'
			   }
			}
		})
		.state('root.usersjuices', {
			url: '/usersjuices',
			templateUrl: "views/usersjuices.html",
			controller: 'UsersJuicesCtrl',
			data: {
				requireLogin: true,
				settings: {
				   displayName: 'Ordered Juices'
			   }
			}
		})
		.state('root.orderjuice', {
			url: "/orderjuice?juiceId",
			templateUrl: "views/orderjuice.html",
			controller: 'OrderJuiceCtrl',
			data: {
				requireLogin: true,
				settings: {
				   displayName: 'Order Juice'
			   }
			}
		})
		.state('root.aboutus', {
			url: "/aboutus",
			templateUrl: "views/aboutus.html",
			controller: 'AboutUsCtrl',
			data: {
				requireLogin: false,
				settings: {
				   displayName: 'About Us'
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
		
		//RestangularProvider.setBaseUrl('http://localhost:3370');
		RestangularProvider.setBaseUrl('http://justvape.azurewebsites.net');
		RestangularProvider.setRestangularFields({
			id: "Id"
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
						//return $state.go('root.dashboard');
					});
				}
			}
		});
	});
