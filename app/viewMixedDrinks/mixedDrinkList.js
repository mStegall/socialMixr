(function () {
    angular.module('app').component('mixedDrinkList', {
        templateUrl: '/viewMixedDrinks/mixedDrinkList.html',
        controller: mixedDrinksCtrl
    })

    function mixedDrinksCtrl(mixedDrinkData) {
        "ngInclude";

        var vm = this;

        vm.$onInit = function () {
            vm.columns = [{
                name: 'name',
                title: 'Name'
            }]

            vm.drinks = mixedDrinkData.getMixedDrinks();

            vm.sortOrder = "name";
        }


        vm.setSortOrder = function (field) {
            if (vm.sortOrder == field) {
                vm.sortOrder = '-' + field;
            } else {
                vm.sortOrder = field;
            }
        }

    }
})()