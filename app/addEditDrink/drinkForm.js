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
            vm.categories = drinkData.getCategories();
            vm.types = drinkData.getTypes();
            vm.subtypes = drinkData.getSubtypes();
        }

        vm.$onChanges = function (changes) {
            if (changes.drink) {
                vm.drink.$promise.then(function () {
                    vm.drink = angular.copy(vm.drink);
                    if (vm.drink.abv) {
                        vm.displayAbv = vm.drink.abv * vm.abvMode;
                    }
                })
            }
        }

        vm.formSubmit = function () {
            if (vm.drink.subtype.id) {
                vm.drink.subtypeId = vm.drink.subtype.id
                delete vm.drink.subtype
            }

            if (vm.drink.type.id) {
                vm.drink.typeId = vm.drink.type.id
                delete vm.drink.type
            }

            vm.submit({
                drink: vm.drink
            })
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