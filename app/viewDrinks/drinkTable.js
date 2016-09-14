(function () {
    angular.module('app').component('drinkTable', {
        templateUrl: '/viewDrinks/drinkTable.html',
        controller: drinkTableCtrl,
        bindings: {
            drinks: '<',
            filter: '<'
        }
    })

    function drinkTableCtrl() {
        "ngInject";

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
                    name: 'subtype',
                    title: 'Subtype'
                }, {
                    name: 'abv',
                    title: 'ABV'
                }
            ]

            vm.sortOrder = 'name';
        }

        vm.sortOrderSet = function (field) {
            if (vm.sortOrder == field) {
                vm.sortOrder = '-' + field;
            } else {
                vm.sortOrder = field;
            }
        }

    }
})()