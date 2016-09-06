(function(){
    angular.module('app').component('drinkForm', {
        templateUrl: '/addEditDrink/drinkForm.html',
        controller: drinkFormCtrl,
        bindings: {
            submit: '&',
            cancel: '&',
            drink: '<'
        }
    })

    function drinkFormCtrl(drinkData){
        "ngInclude";

        var vm = this;

        vm.$onInit = function(){
            vm.types = drinkData.getTypes();
            vm.subtypes = drinkData.getSubtypes();


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
    }
})()