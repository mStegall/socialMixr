(function () {
    angular.module('app').component('drinkListCategory', {
        templateUrl: '/viewDrinks/drinkListCategory.html',
        controller: drinkListCategoryCtrl,
        bindings: {
            category: '<'
        }
    })

    function drinkListCategoryCtrl(drinkData) {
        "ngInclude";

        var vm = this;

        vm.$onInit = function () {
            data = drinkData.getDrinksByCategory(vm.category)
            data.$promise.then(function () {
                vm.drinks = data.drinks
                vm.category = data.category
            })
            .then(function () {
                var types = vm.drinks.map(function (drink) {
                    return drink.type;
                });

                vm.types = _.uniq(types);
            })


            vm.filterCollapsed = true;

            
        }
    }
})()