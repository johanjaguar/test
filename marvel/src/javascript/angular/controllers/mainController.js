app.controller('mainController', ["$scope", "$http", "localStorageService", "marvelFactory" , 
	function( $scope , $http, $storaged, marvel ) {
		$scope.config = {
			complement: 'characters',
			limit: 10,
			name: '',
			offset: 0,
			order: 'name',
			numberPages: 5
		};

		$scope.actualComic = {};
		$scope.posts = [];
		$scope.comicview = false;
		$scope.total = 10;
		$scope.pages = [];
		$scope.currentPage = 0;
		$scope.lastPage = 5;
		
	  $scope.favourites = [];

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

		//Function that modify the value of the post to change the different interaction in the flow
	  $scope.getPost = function( configuration ) {
	 		//$scope.data = marvel.getData( $scope.config );
		  marvel.getData( $scope.config ).then( function(data){
				$scope.total = data.total;
				$scope.posts = data.posts;
				$scope.pages = data.pages;
			})
	  };
	  
	  $scope.changeView = function(){
			$scope.comicview = !$scope.comicview;
	  };

		//Private functions 
		$scope.changePost = function( value ){
			$scope.posts = value;
			console.log( value );
		};

		$scope.changeActualComic = function( comic ){
			if( comic.title == 'No comic selected' ){
				$scope.actualComic.title = 'No comic selected';
      	$scope.actualComic.description = 'No comic selected';
	      $scope.actualComic.URI = 'No comic selected';
	      $scope.actualComic.thumbnail = 'No comic selected';
	      $scope.actualComic.price = 'No comic selected';
	      $scope.actualComic.url = 'No comic selected';
			}
			else{
				$scope.actualComic.title = comic.title;
	      $scope.actualComic.description = (comic.description > 1 ) ?  comic.description : "This comic doesn't have a description";
	      $scope.actualComic.URI = comic.resourceURI;
	      $scope.actualComic.thumbnail = comic.thumbnail.path + '.' + comic.thumbnail.extension;
	      $scope.actualComic.price = comic.prices[0].price;
	      $scope.actualComic.url = comic.urls[0].url;
			}
			
		};

	  $scope.getPost = function( configuration ) {
	 		//$scope.data = marvel.getData( $scope.config );
		  marvel.getData( $scope.config ).then( function(data){
				$scope.total = data.total;
				$scope.posts = data.posts;
				$scope.pages = data.pages;
			})
	  };
 		

 		$scope.pushFavourite = function( $nowComic ){
			$scope.favourites.push({
				the_id: $nowComic.id,
				title: $nowComic.title,
				thumbnail: $nowComic.thumbnail.path + '.' + $nowComic.thumbnail.extension
			}); 
 		};

 		$scope.spliceFavourite = function( $the_id ) {
    	$scope.favourites.splice( findWithAttr( $scope.favourites, 'the_id', $the_id) , 1 );
 		};

 		$scope.getPost( $scope.config );

}]);

function findWithAttr(array, attr, value) {
	for(var i = 0; i < array.length; i += 1) {
    if(array[i][attr] === value) {
      return i;
    }
	}
	return -1;
}




