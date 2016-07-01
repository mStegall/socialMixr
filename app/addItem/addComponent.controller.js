angular.module('app').controller('addComponentCtrl', function ($scope, drinkData, $log, $window, $routeParams) {
    "ngInclude";
    
    if ($routeParams.id) {
        $scope.edit = true;
        $scope.drink = drinkData.getDrink($routeParams.id);
    }
    
    
    
    $scope.regex = '0?\\.\\d+';

    var formBlank = angular.copy($scope.drink);

    $scope.checkValid = function (comp) {
        return {
            'has-success': comp.$valid,
            'has-error': comp.$invalid
        };
    };
    
    $scope.saveDrink = function () {
        if ($scope.edit) {
            drinkData.saveDrink(drink);
        } else {
            drinkData.addDrink(drink);
        }
    }
});