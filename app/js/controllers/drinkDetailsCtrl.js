socialmixr.controller('drinkDetailsCtrl', function ($scope, drinkData, $routeParams) {
    $scope.drink = drinkData.getDrink($routeParams.drinkNum);
});