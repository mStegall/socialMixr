angular.module('app').controller('drinkDetailsCtrl', function ($scope, drinkData, $routeParams, authService, adminData) {
    "ngInclude";
    $scope.drink = drinkData.getDrink($routeParams.drinkNum);
    
    $scope.admin = authService.hasRole('admin')

    $scope.flagDrink = function () {
        var flag = adminData.flagDrink($scope.drink._id);
        flag.$promise.then(function(){
            alert('Drink flagged for review!');
        })
    }
});