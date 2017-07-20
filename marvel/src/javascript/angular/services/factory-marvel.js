app.factory('marvelFactory', function($http, $log, $q) {
  return {
   getData: function( config ) {
     var deferred = $q.defer();
     var url = getMarvelUrl( config );

     $http.get( url )
       .success(function(data) { 
        //console.log(data);
          var pages = [];
          for( var i= 0; i < ( data.data.total / config.limit ) ; i++ ){
            pages.push(i);
          }
          deferred.resolve({
             attribution: data.attributionHTML,
             copyright: data.copyright,
             count: data.data.count,
             pages: pages,
             posts: data.data.results,
             total: data.data.total,
          });
       }).error(function(msg, code) {
          deferred.reject(msg);
          $log.error(msg, code);
       });

     return deferred.promise;
   }
  }
 });
