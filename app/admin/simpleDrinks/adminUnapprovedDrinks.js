(function () {
    angular.module('app').component('adminUnapprovedDrinks', {
        templateUrl: '/admin/simpleDrinks/adminUnapprovedDrinks.html',
        controller: adminUnapprovedDrinksCtrl
    });

    function adminUnapprovedDrinksCtrl(adminDrinks) {
        "ngInclude";

        var vm = this;

        vm.$onInit = function () {
            vm.sortOrder = 'name';
            vm.toggle = true;
            vm.drinks = adminDrinks.getUnapprovedDrinks();
        };

        vm.sortOrderSet = function (field) {
            if (vm.sortOrder == field) {
                vm.sortOrder = '-' + field;
            } else {
                vm.sortOrder = field;
            }
        };

        vm.sortArrows = function (field) {
            return {
                'glyphicon': true,
                'glyphicon-triangle-bottom': vm.sortOrder != '-' + field,
                'glyphicon-triangle-top': vm.sortOrder == '-' + field
            };
        };

        vm.setArrowColor = function (field) {
            if (vm.sortOrder.includes(field)) {
                return { color: 'black' };
            } else {
                return { color: '#ccc' };
            }
        };

        function removeDrink(id) {
            vm.drinks = vm.drinks.filter(function (obj) {
                return obj._id != id;
            })
        }
    }
})()