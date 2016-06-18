angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider.when('/', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        });
        $routeProvider.when('/addComponent', {
            templateUrl: 'addItem/addComponent.html',
            controller: 'addComponentCtrl'
        });
        $routeProvider.when('/drinkDetails/:drinkNum', {
            templateUrl: 'viewDrinks/drinkDetails.html',
            controller: 'drinkDetailsCtrl'
        });

        $routeProvider.when('/snoop', {
            templateUrl: 'snoop/snoop.html'
        });
        
        $routeProvider.when('/mixedDrink/:drinkId', {
            templateUrl: 'viewDrinks/mixedDrinkDetails.html',
            controller: 'mixedDrinkDetails'
        });

        $routeProvider.when('/profile', {
           templateUrl: 'profile/userProfile.html',
            controller: 'userProfileCtrl',
            resolve: {
                
            }
        });

        $routeProvider.otherwise({redirectTo: '/'});
        
    });
