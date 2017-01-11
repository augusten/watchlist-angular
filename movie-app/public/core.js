// public/core.js
var toWatch = angular.module( 'toWatch', [])

function mainController ( $scope, $http ) {
	$scope.formData = {}

	// when landing on the page, get all towatches and show them
	$http.get('/api/towatches')
		.success( function( data ) {
			$scope.towatches = data
			console.log( data )
		} )
		.error ( function (data) {
			console.log ( "error: " + data )
		})

	$scope.createTowatch = function() {
		$http.post('/api/towatches', $scope.formData)
			.success(function(data) {
			    $scope.formData = {} // clear the form so our user is ready to enter another
			    $scope.todos = data
			    console.log(data)
			})
			.error(function(data) {
			    console.log('Error: ' + data);
			})
	}

	// delete a todo after checking it
    $scope.deleteTowatch = function(id) {
        $http.delete('/api/towatches/' + id)
            .success(function(data) {
                $scope.towatches = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    }
}