/////////////////////////////////////////////////////////////////////////
//---------------------- Create Angular controllers ----------------------

toWatch.controller('mainController', ['$scope', '$http', 'search', function ( $scope, $http, search ) {	
	// 
	$scope.movieFound = { data: {Title: '', Language: '', Year: '', Plot: '' }}
	$scope.formData = {}

	// get requests to backend to fetch all to-watches
	$http.get('/api/towatches')
		.success( function( data ) {
			$scope.towatches = data
			console.log( data )
		} )
		.error ( function (data) {
			console.log ( "error: " + data )
		})

	// post request to backend to add another to-watch
	// $scope.createTowatch = function() {
	// 	$http.post('/api/towatches', $scope.formData)
	// 		.success(function(data) {
	// 		    $scope.formData = {} // clear the form so our user is ready to enter another
	// 		    $scope.towatches = data
	// 		    console.log(data)
	// 		})
	// 		.error(function(data) {
	// 		    console.log('Error: ' + data);
	// 		})
	// }



	// delete request to delete it
    $scope.deleteTowatch = function( id ) {
        $http.delete('/api/towatches/' + id)
            .success(function(data) {
                $scope.towatches = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    }

	$scope.findTowatch = function( ) {
		console.log( $scope.formData )
		$scope.movieFound = search.requestLink ( $scope.formData.text )
	}

	$scope.createTowatch = function() {

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