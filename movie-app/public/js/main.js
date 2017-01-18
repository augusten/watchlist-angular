/////////////////////////////////////////////////////////////////////////
//-------------------------- Create Angular module ----------------------

var toWatch = angular.module( 'toWatch', [])

/////////////////////////////////////////////////////////////////////////
//------------------- Angular module configuration ----------------------

// Module configuration to allow cross origin requests 

toWatch.config(['$httpProvider', function( $httpProvider ) { // inject the other provider here
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

