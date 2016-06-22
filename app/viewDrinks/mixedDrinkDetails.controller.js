angular.module('app').controller('mixedDrinkDetails', function ($scope, $routeParams, drinkData) {
    "ngInclude";
    $scope.drink = drinkData.getMixedDrink($routeParams.drinkId);
});