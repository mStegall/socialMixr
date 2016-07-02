angular.module('app').controller('addComponentCtrl', function ($scope, drinkData, $log, $window, $routeParams) {
    "ngInclude";
    
    if ($routeParams.mode == 'edit') {
        $scope.edit = true;
        $scope.drink = drinkData.getDrink($routeParams.opt)
        $scope.drink.$promise.then(function () {
            $scope.displayAbv =  $scope.drink.abv * 200;
        });

    } else {
        $scope.drink = {category: $routeParams.opt};
    }

    $scope.abvMode = "200";
    
    $scope.numberChange = function () {
        
        $scope.drink.abv =  $scope.displayAbv / $scope.abvMode;
    };

    $scope.modeChange = function () {
        $scope.displayAbv = $scope.drink.abv * $scope.abvMode;
    }
    

    $scope.checkValid = function (comp) {
        return {
            'has-success': comp.$valid,
            'has-error': comp.$invalid
        };
    };
    
    $scope.saveDrink = function () {
        if(abvMode = "proof") {
            $scope.drink.abv = $scope.displayAbv / 200;
        } else {
            $scope.drink.abv = $scope.displayAbv / 100;
        }

        if ($scope.edit) {
            drinkData.saveDrink($scope.drink);
        } else {
            drinkData.addDrink($scope.drink);
        }
        $window.history.back();
    }
});