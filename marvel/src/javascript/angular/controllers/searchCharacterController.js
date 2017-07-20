app.controller('searchCharacterController', ["$scope", function( $scope ) {
  $scope.searchCharacter = function( name ){
    $scope.config.name = name;
    $scope.getPost( $scope.config );
  };
}]);
