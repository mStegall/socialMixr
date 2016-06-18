angular.module('app').controller('userProfileCtrl', function ($scope, userInfo) {
    $scope.user = userInfo.getUser();
});