(function () {
    angular.module('app').component('addComponent', {
        templateUrl: '/addEditDrink/addComponent.html',
        controller: addComponentCtrl
    })


    function addComponentCtrl(drinkData, $log, $window, $routeParams) {
        "ngInclude";

        var vm = this;

        vm.$onInit = function () {
            
            vm.types = drinkData.getTypes();
            // vm.subtypes = drinkData.getSubtypes();

            if ($routeParams.mode == 'edit') {
                vm.edit = true;
                vm.drink = drinkData.getDrink($routeParams.opt)
                vm.drink.$promise.then(function () {
                    vm.displayAbv = vm.drink.abv * 200;
                });

            } else {
                vm.drink = { category: $routeParams.opt };
            }

            vm.abvMode = "200";
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

        vm.saveDrink = function (drink) {
            console.log(drink);
            console.log(drink.type.id);
            
            // if (vm.edit) {
            //     drinkData.saveDrink(vm.drink);
            // } else {
            //     drinkData.addDrink(vm.drink);
            // }

            // $window.history.back();
        }

        vm.cancel = function () {
            // $window.history.back();
        }
    }
})();