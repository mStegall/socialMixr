angular.module('app').component('adminUsers', {
    templateUrl: '/admin/adminUsers.html',
    controller: adminUsersCtrl
});


function adminUsersCtrl(adminData) {
    "ngInject"
    var vm = this;
    vm.toggle = true;
    vm.users = adminData.getUsers();
}