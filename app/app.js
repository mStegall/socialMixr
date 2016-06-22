var angular = require('angular');

require('bootstrap/dist/js/bootstrap.js');
require('./common/site.js');

require('./common/style.css');
require('bootswatch/sandstone/bootstrap.css');

angular.module('app', [require('angular-resource'), require('angular-route'), require('angular-ui-bootstrap')])
    .config(function ($routeProvider, $locationProvider) {
        "ngInclude"
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

require('./drinkData/drinkData.service.js');
require('./addItem/addComponent.controller.js');
require('./common/percentage.filter.js');
require('./home/home.controller.js');
require('./login');
require('./profile');
require('./snoop');
require('./viewDrinks');
