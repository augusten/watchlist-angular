/////////////////////////////////////////////////////////////////////////
//---------------------- Create Angular controllers ----------------------

toWatch.controller('mainController', ['$scope', '$http', 'search', function ( $scope, $http, search ) {	
	// 

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

	$scope.createTowatch = function() {
		// console.log( search )
		search.success( function( data ) {
			console.log( data )
			$scope.movie = data
		})
	}
}])