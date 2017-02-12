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
            })

            // login page
            .when('/login', {
                templateUrl : 'app/views/pages/login.html',
                controller  : 'mainController',
                controllerAs: 'login'
            });
        
        // get rid of the hash in the URL
        // set our app to have pretty URLs
        $locationProvider.html5Mode(true);
    });