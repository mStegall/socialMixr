(function () {
    angular.module('app').component('adminApproveDrinks', {
        templateUrl: '/admin/simpleDrinks/adminApproveDrinks.html',
        controller: adminApproveDrinksCtrl
    });

    function adminApproveDrinksCtrl(adminDrinks) {
        "ngInclude";

        var vm = this;

        vm.$onInit = function () {
            vm.columns = [
                {
                    name: 'name',
                    title: 'Name'
                }, {
                    name: 'type',
                    title: 'Type'
                }, {
                    name: 'abv',
                    title: 'ABV',
                    hiddenXs: true
                }, {
                    unsortable: true
                }
            ]

            vm.sortOrder = 'name';
            vm.toggle = true;
            vm.drinks = adminDrinks.getReviewDrinks();
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

        vm.approveDrink = function (id) {
            var drink = adminDrinks.approveDrink(id);

            drink.$promise.then(removeDrink(id))

        };

        vm.rejectDrink = function (id) {
            var del = adminDrinks.rejectDrink(id);
            del.$promise.then(removeDrink(id))
        };

        function removeDrink(id) {
            vm.drinks = vm.drinks.filter(function (obj) {
                return obj.id != id;
            })
        }
    }
})()