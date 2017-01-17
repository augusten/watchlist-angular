/////////////////////////////////////////////////////////////////////////
//---------------------- Create Angular services ----------------------

toWatch.service('search', ['$http', function( $http ) {

	// connect to external movie api to search for movie

	this.requestLink = function ( input ) {
		// function to request data from OMDb API
		input.replace(/ /g,"+")
		return $http.get('http://omdbapi.com/?t=' + input + '&y=&plot=short&r=json', { headers : { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
		.success( function ( data ) {
			return data
		})
	}
}])