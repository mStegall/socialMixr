angular.module('app').controller('adminUsersCtrl', function ($scope, adminData) {
    "ngInclude";
    $scope.users = adminData.getUsers();
});