/////////////////////////////////////////////////////////////////////////
//-------------------------- Create Angular module ----------------------

var toWatch = angular.module( 'toWatch', [])

/////////////////////////////////////////////////////////////////////////
//------------------- Angular module configuration ----------------------

// Module configuration to allow cross origin requests 

toWatch.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) { // inject the other provider here
$routeProvider.when('/', {
    templateUrl: 'homepage/view.html',
    controller: 'HomepageCtrl',
    resolve: {
        data: function($q, $http, $route, $rootScope) {
            var deferred = $q.defer();
            $http({method: 'GET', url: $rootScope.apiURL + 'home'})
                .then(function(data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        }
      }
    });

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

