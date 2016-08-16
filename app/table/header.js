(function () {
    angular.module('app').directive('tableHead', function () {
        return {
            restrict: 'A',
            templateUrl: '/table/header.html',
            controller: tableHeadCtrl,
            controllerAs: '$ctrl',
            scope: {
                columns: '<',
                sortOrder: '<',
                sortOrderChange: '&'
            },
            bindToController: true
        }
    })

    function tableHeadCtrl() {
        "ngInclude";

        var vm = this;

        vm.sortArrows = function (field) {
            return {
                'glyphicon': true,
                'glyphicon-triangle-bottom': vm.sortOrder != '-' + field,
                'glyphicon-triangle-top': vm.sortOrder == '-' + field
            };
        }

        vm.setArrowColor = function (field) {
            if (vm.sortOrder.includes(field)) {
                return { color: 'black' };
            } else {
                return { color: '#ccc' };
            }
        }
    }
})()