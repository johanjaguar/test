app.controller('mainController', ["$scope", "$http", "localStorageService", "marvelFactory" , function( $scope , $http, $storaged, marvel ) {
	$scope.config = {
		complement: 'characters',
		limit: 10,
		name: '',
		offset: 0,
		order: 'name',
		numberPages: 5
	};

	$scope.posts = [];
	$scope.comicview = false;
	$scope.total = 10;
	$scope.pages = [];
	$scope.currentPage = 0;
	$scope.lastPage = 5;
	
  //$scope.data = marvel.getData( $scope.config );
  marvel.getData( $scope.config ).then( function(data){
		$scope.total = data.total;
		$scope.posts = data.posts;
		$scope.pages = data.pages;
	})
	
	$scope.searchCharacter = function( name ){
		$scope.config.name = name;
		marvel.getData( $scope.config ).then( function(data){
			$scope.total = data.total;
			$scope.posts = data.posts;
			$scope.pages = data.pages;
		});
	}

	$scope.moreResults = function( complement = 'characters', limit = 10, n = 1, name){
		var offset = 0;
		$scope.currentPage = n;
		$scope.lastPage = n + $scope.config.numberPages;
		if( n > 1 ){
			offset = ( limit * ( n -1 ) ) -1 ;
		}
		$scope.config.complement = name;
		$scope.config.complement = complement;
		$scope.config.limit = limit;
		$scope.config.offset = offset;
		marvel.getData( $scope.config ).then( function(data){
			$scope.total = data.total;
			$scope.posts = data.posts;
			$scope.pages = data.pages;
		})
	}
	
	$scope.actualComic = {
		title: 'No comic selected',
		description: 'No comic selected',
		URI: 'No comic selected',
		thumbnail: 'No comic selected',
		price: 'No comic selected',
		url: 'no comic selected'
	};

	$scope.changeActualComic = function( $resourceURI ){
		$scope.comicview = !$scope.comicview;

		if( $resourceURI === 'reset' ){
			$scope.actualComic.title = 'No comic selected';
			$scope.actualComic.description = 'No comic selected';
			$scope.actualComic.URI = 'No comic selected';
			$scope.actualComic.thumbnail = 'No comic selected';
			$scope.actualComic.price = 'No comic selected';
			$scope.actualComic.url = 'No comic selected';
		}

		else{
			$resourceURI = $resourceURI.replace('http', 'https');
			$resourceURI = $resourceURI + getHash(); 
			//console.log( $resourceURI );
			var $nowComic = {};

			$http.get( $resourceURI )
				.success(function(data){
					$nowComic = data.data.results[0];
					//console.log( $nowComic );
					$scope.actualComic.title = $nowComic.title;
					$scope.actualComic.description = ( $nowComic.description > 1 ) ?  $nowComic.description : "This comic doesn't have a description";
					$scope.actualComic.URI = $nowComic.resourceURI;
					$scope.actualComic.thumbnail = $nowComic.thumbnail.path + '.' + $nowComic.thumbnail.extension;
					$scope.actualComic.price = $nowComic.prices[0].price;
					$scope.actualComic.url = $nowComic.urls[0].url

					//console.log( $scope.actualComic );
				})
				.error(function(err){
					console.log("error" + err);
				})	
		}
	}
	

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
		//console.log( $resourceURI );
		var $nowComic = {};

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
				$scope.changeActualComic( 'reset' );
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




