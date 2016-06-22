angular.module('app').controller('userProfileCtrl', function ($scope, userInfo) {
    "ngInclude";
    $scope.user = userInfo.getUser();
});