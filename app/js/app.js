angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.when('/', {
            templateUrl: 'templates/main.html',
            controller: 'homeCtrl'
        });
        $routeProvider.when('/addComponent', {
            templateUrl: 'templates/addComponent.html',
            controller: 'addComponentCtrl'
        });
        $routeProvider.when('/drinkDetails/:drinkNum', {
            templateUrl: 'templates/drinkDetails.html',
            controller: 'drinkDetailsCtrl'
        });

        $routeProvider.when('/snoop', {
            templateUrl: 'templates/snoop.html',
            controller: 'snoopCtrl'
        });
        
        $routeProvider.when('/mixedDrink/:drinkId', {
            templateUrl: 'templates/mixedDrinkDetails.html',
            controller: 'mixedDrinkDetails'
        });

        $routeProvider.when('/login', {
            templateUrl: 'templates/logIn.html',
            controller: 'logInCtrl'
        });

        $routeProvider.when('/profile', {
           templateUrl: 'templates/userProfile.html',
            controller: 'userProfileCtrl',
            resolve: {
                
            }
        });

        $routeProvider.otherwise({redirectTo: '/'});
        
    });

