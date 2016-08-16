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
    $routeProvider.when('/addMixedDrink/:mode?/:opt?', {
        template: '<add-edit-mixed-drink></add-edit-mixed-drink>'
    })
    $routeProvider.when('/addComponent/:mode?/:opt?', {
        template: '<add-component></add-component>'
    });
    $routeProvider.when('/drinkList/:category?/:opt?', {
        templateUrl: 'viewDrinks/drinkList.html',
        controller: 'drinkListCtrl'
    });
    $routeProvider.when('/drinkDetails/:id', {
        template: function (params) {
            return '<drink-details id="' + params.id + '"></drink-details>'
        }
    });
    $routeProvider.when('/mixedDrinks', {
        template: '<mixed-drink-list></mixed-drink-list>'
    })
    $routeProvider.when('/mixedDrinkDetails/:id', {
        template: function (params) {
            return '<mixed-drink-details id="' + params.id + '"></mixed-drink-details>'
        }
    });
    $routeProvider.when('/snoop', {
        templateUrl: 'snoop/snoop.html'
    });
    $routeProvider.when('/admin/:page?', {
        template: '<admin-panel></admin-panel>'
    });
    $routeProvider.when('/profile', {
        template: '<user-profile></user-profile>'
    });
    $routeProvider.otherwise({redirectTo: '/'});

});