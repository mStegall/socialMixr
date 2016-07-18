angular.module('app').component('adminSimpleDrinks', {
    templateUrl: '/admin/adminSimpleDrinks.html',
    controller: adminSimpleDrinksCtrl
});

function adminSimpleDrinksCtrl(adminData) {
    "ngInclude";

    var vm = this;

    vm.$onInit = function () {
        vm.sortOrder = 'name';
        vm.toggle = true;
        vm.drinks = adminData.getReviewDrinks();
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
            return {color: 'black'};
        } else {
            return {color: '#ccc'};
        }
    };

    vm.approveDrink = function (id) {
        var drink = adminData.approveDrink(id);

        drink.$promise.then(removeDrink(id))

    };

    vm.rejectDrink = function (id) {
        var del = adminData.rejectDrink(id);
        del.$promise.then(removeDrink(id))
    };

    function removeDrink(id) {
        vm.drinks = vm.drinks.filter(function(obj) {
            return obj._id != id;
        })
    }
};

