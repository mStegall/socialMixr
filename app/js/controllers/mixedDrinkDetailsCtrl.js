socialmixr.controller('mixedDrinkDetails', function ($scope, $routeParams, drinkData) {
    $scope.drink = drinkData.getMixedDrink($routeParams.drinkId);
});