// create the module and name it scotchApp
app.controller('mainController', ["$scope", "$http", function( $scope , $http ) {
	$scope.baseUrl = getMarvelUrl('');
	$scope.charactersUrl = getMarvelUrl('characters');
	$scope.comicsUrl = getMarvelUrl('comics');
	$scope.posts = [];
	$scope.hash = getHash();
	$scope.favourites = [];
	
	$http.get( $scope.charactersUrl )
		.success(function(data){
			//console.log(data.data.results);
			$scope.posts = data.data.results;
		})
		.error(function(err){
			console.log(err);
		})

	$scope.addFavourite = function( $resourceURI ) {
		$resourceURI = $resourceURI.replace('http', 'https');
		$resourceURI = $resourceURI + getHash(); 
		var $nowComic;
		$http.get( $resourceURI )
			.success(function(data){
				//console.log(data.data.results);
				$nowComic = data.data.results[0];
				var found = $scope.favourites.some(function (el) {
			    return el.the_id === $nowComic.id;
			  });
			  if( !found ){
				  $scope.favourites.push({
						the_id: $nowComic.id,
						title: $nowComic.title,
						thumbnail: $nowComic.thumbnail.path + '.' + $nowComic.thumbnail.extension
					});	
			  }	
				console.log( $scope.favourites );
			})
			.error(function(err){
				console.log("error" + err);
			})
	}
}]);
