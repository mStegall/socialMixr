(function () {
    angular.module('app').component('mixedDrinkDetails', {
        templateUrl: '/viewMixedDrinks/mixedDrinkDetails.html',
        controller: mixedDrinksCtrl,
        bindings: {
            id: '@'
        }
    })

    function mixedDrinksCtrl(mixedDrinkData) {
        "ngInclude";

        var vm = this;

        vm.$onInit = function () {
            vm.drink = mixedDrinkData.getMixedDrink(vm.id);

        }


    }
})()