// configure our routes
testProdigious.config(function($routeProvider) {
  $routeProvider

    // route for the home page
    .when('/', {
      templateUrl : 'partials/widget1.html',
      controller  : 'widget1Controller'
    })

    // route for the about page
    .when('/widget2', {
      templateUrl : 'partials/widget2.html',
      controller  : 'widget2Controller'
    })

    // route for the contact page
    .when('/widget3', {
      templateUrl : 'partials/widget3.html',
      controller  : 'widget3Controller'
    });
});
