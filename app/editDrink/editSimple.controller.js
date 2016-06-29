angular.module('app').controller('editSimpleCtrl', function (drinkData, $routeParams, $scope, $location) {
    "ngInclude";
    $scope.drink = drinkData.getDrink($routeParams.drinkId);

    $scope.updateDrink = function (drink) {
        drinkData.updateDrink(drink);
        $location.path('/drinkList');
    }
});