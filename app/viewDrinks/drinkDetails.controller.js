angular.module('app').controller('drinkDetailsCtrl', function ($scope, drinkData, $routeParams) {
    "ngInclude";
    $scope.drink = drinkData.getDrink($routeParams.drinkNum);
});