(function () {
    angular.module('app').component('adminPanel', {
        templateUrl: "/admin/adminPanel.html",
        controller: adminPanelCtrl
    })

    function adminPanelCtrl(authService, $routeParams) {
        "ngInclude";

        var vm = this;

        authService.roleRouter('admin');

        vm.list = [
            {
                name: 'users',
                title: 'Users'
            },
            {
                name: 'approveDrinks',
                title: 'Approve Drinks'
            },
            {
                name: 'unapprovedDrinks',
                title: 'Unapproved Drinks'
            },
            {
                name: 'approveMixedDrinks',
                title: 'Approve Mixed Drinks'
            }
        ]

        if ($routeParams.page) {
            vm.page = $routeParams.page;
        } else {
            vm.page = 'users';
        }

        vm.pageTitle = vm.list.filter(function (item) {
            return item.name == vm.page;
        })[0].title
    }
})()