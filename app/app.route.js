angular.module('app').config(function ($routeProvider, $locationProvider) {
    "ngInclude";
    $locationProvider.html5Mode(true);
    $routeProvider.when('/', {
        templateUrl: 'home/home.html'
    });
    $routeProvider.when('/beer', {
        templateUrl: 'infoPages/beer.html'
    });
    $routeProvider.when('/wine', {
        templateUrl: 'infoPages/wine.html'
    });
    $routeProvider.when('/spirits', {
        templateUrl: 'infoPages/spirits.html'
    });
    $routeProvider.when('/mixedDrinks', {
        templateUrl: 'infoPages/mixedDrinks.html'
    });
    $routeProvider.when('/addComponent/:mode?/:opt?', {
        template: '<add-component></add-component>'
    });
    $routeProvider.when('/editDrink/:id', {
        templateUrl: 'addItem/addComponent.html',
        controller: 'addComponentCtrl'
    });
    $routeProvider.when('/drinkList/:category?/:opt?', {
        templateUrl: 'viewDrinks/drinkList.html',
        controller: 'drinkListCtrl'
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
    $routeProvider.when('/admin/:page?', {
        templateUrl: 'admin/adminPanel.html',
        controller: 'adminPanelCtrl'
    });
    $routeProvider.when('/profile', {
        templateUrl: 'profile/userProfile.html',
        controller: 'userProfileCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});

});