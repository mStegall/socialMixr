(function () {
    angular.module('app').component('addComponent', {
        templateUrl: '/addItem/addComponent.html',
        controller: addComponentCtrl
    })


    function addComponentCtrl(drinkData, $log, $window, $routeParams) {
        "ngInclude";

        var vm = this;

        vm.$onInit = function () {
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

        vm.saveDrink = function () {
            if (abvMode = "proof") {
                vm.drink.abv = vm.displayAbv / 200;
            } else {
                vm.drink.abv = vm.displayAbv / 100;
            }

            if (vm.edit) {
                drinkData.saveDrink(vm.drink);
            } else {
                drinkData.addDrink(vm.drink);
            }
            $window.history.back();
        }
    }
})();