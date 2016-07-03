angular.module('app').component('adminUsers', {
    templateUrl: '/admin/adminUsersTable.html',
    controller: adminUsersCtrl
});


function adminUsersCtrl(adminData) {
    "ngInject"
    var mv = this;
    mv.toggle = true;
    mv.users = adminData.getUsers();
}