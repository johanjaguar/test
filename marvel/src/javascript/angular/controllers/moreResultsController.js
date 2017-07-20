app.controller('moreResultsController', ["$scope" , function( $scope ) {
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
    $scope.getPost( $scope.config );
  }
}]);
