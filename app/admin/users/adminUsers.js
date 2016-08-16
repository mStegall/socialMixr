(function () {
    angular.module('app').component('adminUsers', {
        templateUrl: '/admin/users/adminUsers.html',
        controller: adminUsersCtrl
    });


    function adminUsersCtrl(adminUsers) {
        "ngInject"
        var vm = this;
        vm.toggle = true;
        vm.users = adminUsers.getUsers();
    }
})()