/////////////////////////////////////////////////////////////////////////
//---------------------- Create Angular services ----------------------

toWatch.factory('search', ['$http', function( $http ) {
	// connect to external movie api to search for movie
	return $http.get('http://omdbapi.com/?t=kiss+kiss&y=&plot=short&r=json')
	.success( function ( data ) {
		return data
	})
}])