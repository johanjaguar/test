// create the module and  name it scotchApp
app.controller('mainController', ["$scope", "$http", "localStorageService", function( $scope , $http, $storaged ) {
	$scope.baseUrl = getMarvelUrl(''); 
	$scope.charactersUrl = getMarvelUrl('characters');
	$scope.comicsUrl = getMarvelUrl('comics');
	$scope.posts = [];
	$scope.hash = getHash();

	
	$http.get( $scope.charactersUrl )
		.success(function(data){
			//console.log(data.data.results);
			$scope.posts = data.data.results;
		})
		.error(function(err){
			console.log(err);
		})
	
	if( $storaged.get("favourites-list")){
		$scope.favourites = $storaged.get("favourites-list");
	}
	else{
		$scope.favourites = [];
	}

	$scope.$watchCollection( 'favourites',
		function( newValue, oldValue ){
			$storaged.set( "favourites-list" , $scope.favourites );
		}
	);
	$scope.addFavourite = function( $resourceURI ) {
		$resourceURI = $resourceURI.replace('http', 'https');
		$resourceURI = $resourceURI + getHash(); 
		console.log( $resourceURI );
		var $nowComic;

		$http.get( $resourceURI )
			.success(function(data){
				//console.log(data.data.results);
				$nowComic = data.data.results[0];

				var found = $scope.favourites.some(function (el) {
			    return el.the_id === $nowComic.id;
			  });
				if( $scope.favourites.length < 3 ) {
					if( !found ){
					  $scope.favourites.push({
							the_id: $nowComic.id,
							title: $nowComic.title,
							thumbnail: $nowComic.thumbnail.path + '.' + $nowComic.thumbnail.extension
						});	
				  }	
				  else{
						alert( "You can't add the same comic more than 1 time");
					}
				}
				else{
					alert( "You can't add more than 3 comics");
				}
			})
			.error(function(err){
				console.log("error" + err);
			})
	}

	$scope.deleteFavourite = function( $the_id ){
		$scope.favourites.splice( findWithAttr( $scope.favourites, 'the_id', $the_id) , 1 );
	}

}]);


function findWithAttr(array, attr, value) {
	for(var i = 0; i < array.length; i += 1) {
    if(array[i][attr] === value) {
      return i;
    }
	}
	return -1;
}