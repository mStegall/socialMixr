import * as angular from 'angular';
import 'angular-route';

function router($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
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
    .when('/addMixedDrink', {
      template: '<add-mixed-drink></add-mixed-drink>'
    })
    .when('/addDrink/:categoryId?', {
      template: '<add-drink category-id="$resolve.params.categoryId"></add-drink>',
      resolve: {
        params: function ($route) {
          console.log($route.current.params.categoryId);
          return $route.current.params;
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
          return $route.current.params;
        }
      }
    })
    .when('/drinkListCategory/:category', {
      template: '<drink-list-category category="$resolve.params.category"></drink-list-category>',
      resolve: {
        params: function ($route) {
          return $route.current.params;
        }
      }
    })
    .when('/drinkList', {
      template: '<drink-list></drink-list>'
    })
    .when('/drinkDetails/:id', {
      template: '<drink-details id="$resolve.params.id"></drink-details>',
      resolve: {
        params: function ($route) {
          return $route.current.params;
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
          return $route.current.params;
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
}

router.$inject = ['$routeProvider', '$locationProvider'];

angular.module('app').config(router);