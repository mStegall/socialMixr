(function () {
    angular.module('app').controller('drinkListCtrl', function ($scope, drinkData, login, $routeParams) {
        "ngInclude";

        $scope.columns = [
            {
                name: 'name',
                title: 'Name'
            }, {
                name: 'type',
                title: 'Type'
            }, {
                name: 'manufacturer',
                title: 'Manufacturer',
                hiddenXs: true
            }, {
                name: 'countryOfOrigin',
                title: 'Country of Origin',
                hiddenXs: true
            }, {
                name: 'abv',
                title: 'ABV'
            }, {
                unsortable: true
            }
        ]

        $scope.sortOrder = 'name';
        $scope.filterCollapsed = true;



        if ($routeParams.opt == 'type') {
            $scope.filterCollapsed = false;
            $('#type').focus().click();
        }

        if ($routeParams.category) {
            $scope.category = $routeParams.category;
            $scope.drinks = drinkData.getDrinksByCategory($routeParams.category);
        } else {
            $scope.drinks = drinkData.getDrinks();
        }

        $scope.drinks.$promise.then(function () {
            var types = $scope.drinks.map(function (drink) {
                return drink.type;
            });

            types = _.uniq(types);

            $scope.types = types;
        });

        $scope.toggleLiquorFavorite = function (drink) {
            drink.fav = !drink.fav;
        }

        $scope.sortOrderSet = function (field) {
            if ($scope.sortOrder == field) {
                $scope.sortOrder = '-' + field;
            } else {
                $scope.sortOrder = field;
            }
        }
    })
})()