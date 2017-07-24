app.controller('favouriteController', ["$scope", "$http", "localStorageService", "comicFactory" , function( $scope , $http, $storaged, factory  ) {

  $scope.deleteFavourite = function( $the_id ){
    $scope.spliceFavourite( $the_id );
  }

  $scope.getActualComic = function( $resourceURI ){
    $scope.changeView();

    if( $resourceURI === 'reset' ){
      var nowComic = {};
      nowComic.title = 'No comic selected';
      $scope.changeActualComic( nowComic );
    }

    else{
      $resourceURI = $resourceURI.replace('http', 'https');

      $scope.config = {
        base: $resourceURI,
        complement: 'comic',
        limit: 100,
        offset: 0,
        name: '',
        order: 'modified',
      };
      
      factory.getData( $scope.config ).then( function(data){
        $scope.total = data.total;
        console.log(data.comic);
        $scope.changeActualComic( data.comic );
      })

    } 
  };   

  $scope.addFavourite = function( $resourceURI ) {
    $resourceURI = $resourceURI.replace('http', 'https');    
    var $nowComic = {};

    $scope.config = {
      base: $resourceURI,
      complement: 'comic',
      limit: 100,
      offset: 0,
      name: '',
      order: 'modified',
    };
    
    factory.getData( $scope.config ).then( function(data){
      $scope.total = data.total;
      $nowComic = data.comic;
      var found = $scope.favourites.some(function (el) {
        return el.the_id === $nowComic.id;
      });
      if( $scope.favourites.length < 3 ) {
        if( !found ){
          $scope.pushFavourite( $nowComic );
        } 
        else{
          alert( "You can't add the same comic more than 1 time");
        }
      }
      else{
        alert( "You can't add more than 3 comics");
      }
      $scope.getActualComic( 'reset' );
    })
  }
  
}]);
