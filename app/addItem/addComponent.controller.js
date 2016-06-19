var angular = require('angular');

angular.module('app').controller('addComponentCtrl', function ($scope, drinkData, $log) {
    $scope.regex = '0?\\.\\d+';

    var formBlank = angular.copy($scope.drink);

    $scope.checkValid = function (comp) {
        return {
            'has-success': comp.$valid,
            'has-error': comp.$invalid
        };
    };
    
    $scope.addDrink = function (drink) {
        drinkData.saveDrink(drink);
        $scope.drink = formBlank;
        $scope.componentInput.$setPristine();
    }
});