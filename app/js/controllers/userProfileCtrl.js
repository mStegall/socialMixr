socialmixr.controller('userProfileCtrl', function ($scope, userInfo) {
    $scope.user = userInfo.getUser();
});