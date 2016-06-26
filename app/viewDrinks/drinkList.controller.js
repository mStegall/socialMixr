angular.module('app').controller('drinkListCtrl', function ($scope, drinkData, login) {
    "ngInclude";
    $scope.sortOrder = 'name';

    $scope.drinks = drinkData.getDrinks();

    $scope.login = login.logInState();

    $scope.$on('loginStateChanged', function () {
        $scope.login = login.logInState();
    });

    $scope.toggleLiquorFavorite = function (drink) {
        drink.fav = !drink.fav;
    };

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

    $scope.openDeleteModal = function (drink) {
        $scope.modalDrinkName = drink.name;
        $scope.modalDrinkId = drink._id;
        $('#deleteDrinkModal').modal();
    };

    $scope.deleteDrink = function (drinkId) {
        drinkData.deleteDrink(drinkId).$promise.then(function () {
            $scope.drinks = drinkData.getDrinks();
        });
        $('#deleteDrinkModal').modal('hide');
    };
});
 