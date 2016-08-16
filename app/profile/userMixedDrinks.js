(function () {
    angular.module('app').component('userMixedDrinks', {
        templateUrl: '/profile/userMixedDrinks.html',
        controller: userMixedDrinksCtrl
    })

    function userMixedDrinksCtrl(userInfo) {
        "ngInclude";

        var vm = this;

        vm.columns = [
            {
                name: 'name',
                title: 'Name'
            }
        ]

        vm.$onInit = function () {
            vm.drinks = userInfo.mixedDrinks();

            vm.sortOrder = 'name'
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