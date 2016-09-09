angular.module('app').config(function ($routeProvider, $locationProvider) {
  "ngInclude";
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    templateUrl: 'home/home.html'
  })
    .when('/beer', {
      templateUrl: 'infoPages/beer.html'
    })
    .when('/wine', {
      templateUrl: 'infoPages/wine.html'
    })
    .when('/spirits', {
      templateUrl: 'infoPages/spirits.html'
    })
    .when('/mixedDrinks', {
      templateUrl: 'infoPages/mixedDrinks.html'
    })
    .when('/addMixedDrink/:mode?/:opt?', {
      template: '<add-edit-mixed-drink></add-edit-mixed-drink>'
    })
    .when('/addDrink/:category?', {
      template: '<add-drink category="$resolve.params.category"></add-drink>',
      resolve: {
        params: function ($route) {
          return $route.current.params
        }
      }
    })
    .when('/editDrink/:id', {
      template: '<edit-drink drink="$resolve.drink"></edit-drink>',
      resolve: {
        drink: function ($route, drinkData) {
          return drinkData.getDrink($route.current.params.id);
        },
        params: function ($route) {
          return $route.current.params
        }
      }
    })
    .when('/drinkList/:category?/:opt?', {
      templateUrl: 'viewDrinks/drinkList.html',
      controller: 'drinkListCtrl'
    })
    .when('/drinkDetails/:id', {
      template: '<drink-details id="$resolve.params.id"></drink-details>',
      resolve: {
        params: function ($route) {
          return $route.current.params
        }
      }
    })
    .when('/mixedDrinks', {
      template: '<mixed-drink-list></mixed-drink-list>'
    })
    .when('/mixedDrinkDetails/:id', {
      template: '<mixed-drink-details id="$resolve.params.id"></mixed-drink-details>',
      resolve: {
        params: function ($route) {
          return $route.current.params
        }
      }
    })
    .when('/snoop', {
      templateUrl: 'snoop/snoop.html'
    })
    .when('/admin/:page?', {
      template: '<admin-panel></admin-panel>'
    })
    .when('/profile', {
      template: '<user-profile></user-profile>'
    })
    .otherwise({ redirectTo: '/' });

});