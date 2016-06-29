angular.module('app').controller('adminSimpleDrinksCtrl', function ($scope, adminData, login) {
    "ngInclude";

    $scope.sortOrder = 'name';

    $scope.drinks = adminData.getUnapprovedDrinks();

    $scope.sortOrderSet = function (field) {
        if ($scope.sortOrder == field) {
            $scope.sortOrder = '-' + field;
        } else {
            $scope.sortOrder = field;
        }
    };

    $scope.sortArrows = function (field) {
        return {
            'glyphicon': true,
            'glyphicon-triangle-bottom': $scope.sortOrder != '-' + field,
            'glyphicon-triangle-top': $scope.sortOrder == '-' + field
        };
    };

    $scope.setArrowColor = function (field) {
        if ($scope.sortOrder.includes(field)) {
            return {color: 'black'};
        } else {
            return {color: '#ccc'};
        }
    };

    $scope.approveDrink = function (id) {
        var drink = adminData.approveDrink(id);
        drink.$promise.then(function () {
            $scope.drinks = adminData.getUnapprovedDrinks();
        })
    };
});
 