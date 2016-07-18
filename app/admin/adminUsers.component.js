angular.module('app').component('adminUsers', {
    templateUrl: '/admin/adminUsersTable.html',
    controller: adminUsersCtrl
});


function adminUsersCtrl(adminData) {
    "ngInject"
    var vm = this;
    vm.toggle = true;
    vm.users = adminData.getUsers();
}