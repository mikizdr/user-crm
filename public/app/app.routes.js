// inject ngRoute for all our routing needs
angular.module('app.routes', ['ngRoute'])

    // configure our routes
    .config(function($routeProvider, $locationProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'app/views/pages/home.html'//,
                //controller  : 'homeController',
                //controllerAs: 'home'
            });
        
        // get rid of the hash in the URL
        // set our app to have pretty URLs
        $locationProvider.html5Mode(true);
    });