app.factory('comicFactory', function($http, $log, $q) {
return {
  getData: function( config ) {
    var deferred = $q.defer();
    var url = getMarvelUrl( config );
    
    $http.get( url )
      .success(function(data) { 
        deferred.resolve({
          attribution: data.attributionHTML,
          copyright: data.copyright,
          count: data.data.count,
          comic: data.data.results[0],
          total: data.data.total,
        });
      }).error(function(msg, code) {
        deferred.reject(msg);
        $log.error(msg, code);
      });
    return deferred.promise;
  }
}});
