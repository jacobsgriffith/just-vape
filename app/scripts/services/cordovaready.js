'use strict';
/*angular.module('justVapeApp')
  .service('CordovaReady', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
});*/

angular.module('justVapeApp').factory('CordovaReady', ['$q', function($q) {
	console.log('listening for ready');
	return function(scope) {
		var deferred = $q.defer(); 
		document.addEventListener('deviceready', function() {
			console.log('ready');
			if(scope){
				scope.$apply(function(){
					deferred.resolve();
				});
			} else {
				deferred.resolve();
			}
		}, false);
		return deferred.promise;
	};
}]);