/////////////////////////////////////////////////////////////////////////
//---------------------- Create Angular controllers ----------------------

toWatch.controller('mainController', ['$scope', '$http', 'search', function ( $scope, $http, search ) {	
	// initialize some parameters upon first load of page
	$scope.movieFound = { data: {Title: '', Language: '', Year: '', Plot: '' }}
	$scope.formData = {}

	// get requests to backend to fetch all to-watches
	$http.get('/api/towatches')
		.success( function( data ) {
			$scope.towatches = data
		} )
		.error ( function (data) {
			console.log ( "error: " + data )
		})

	// delete request to delete it
    $scope.deleteTowatch = function( id ) {
        $http.delete('/api/towatches/' + id)
            .success(function(data) {
                $scope.towatches = data
            })
            .error(function(data) {
                console.log('Error: ' + data)
            })
    }

	$scope.findTowatch = function( ) {
		// search for a movie/ enable service
		$scope.movieFound = search.requestLink ( $scope.formData.text )
	}

	$scope.createTowatch = function() {
		// add a to watch to the database
		$http.post('/api/towatches', {text: $scope.movieFound.$$v.data.Title } )
		.success ( function ( data ) {
			$scope.formData = {}
			$scope.towatches = data
		})
		.error ( function ( data ) {
			console.log( "errrorrrrrrrrr: " + data)
		})
	}
}])