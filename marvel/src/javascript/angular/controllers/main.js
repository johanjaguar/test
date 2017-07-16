// create the module and name it scotchApp
app.controller('mainController', ["$scope", "$http", function( $scope , $http ) {
	$scope.baseUrl = getMarvelUrl('');
	$scope.charactersUrl = getMarvelUrl('characters');
	$scope.comicsUrl = getMarvelUrl('comics');
	$scope.posts = [];
	$scope.hash = getHash();
	$http.get( $scope.charactersUrl )
		.success(function(data){
			console.log(data.data.results);
			$scope.posts = data.data.results;
		})
		.error(function(err){
			console.log(err);
		})
}]);
 