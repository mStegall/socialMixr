(function () {
    angular.module('app').component('drinkForm', {
        templateUrl: '/addEditDrink/drinkForm.html',
        controller: drinkFormCtrl,
        bindings: {
            submit: '&',
            cancel: '&',
            drink: '<'
        }
    })

    function drinkFormCtrl(drinkData) {
        "ngInclude";

        var vm = this;

        vm.abvMode = "200";

        vm.$onInit = function () {
            vm.types = drinkData.getTypes();
            vm.subtypes = drinkData.getSubtypes();
        }

        vm.$onChanges = function (changes) {
            if (changes.drink) {
                vm.drink = angular.copy(vm.drink);
                vm.displayAbv = vm.drink.abv * vm.abvMode;
            }
        }

        vm.numberChange = function () {
            vm.drink.abv = vm.displayAbv / vm.abvMode;
        };

        vm.modeChange = function () {
            vm.displayAbv = vm.drink.abv * vm.abvMode;
        }

        vm.checkValid = function (comp) {
            return {
                'has-success': comp.$valid,
                'has-error': comp.$invalid
            };
        };
    }
})()