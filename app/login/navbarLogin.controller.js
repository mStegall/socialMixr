angular.module('app').controller('navbarLoginCtrl',  function ($scope, login, $uibModal, userInfo, $location, $rootScope) {

    $scope.updateLoginState = function () {
        login.updateLoginState().then( function () {
            $scope.loggedIn = Boolean(login.logInState());
            $scope.user = userInfo.getUser()
        }, function () {
            $scope.loggedIn = Boolean(login.logInState());
        });
    };
    
    
    $scope.logInModal = function () {
        var modal = $uibModal.open({
            templateUrl:"login/logInModal.html",
            controller: "loginModalCtrl"
        });

        modal.closed.then(function () {
            $scope.updateLoginState();
        })
    };

    $scope.logOut = function () {
        login.logOut().then(function () {
            $scope.updateLoginState();
            $location.url('/');
        });
    };

    $scope.updateLoginState();
});