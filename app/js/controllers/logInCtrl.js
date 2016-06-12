socialmixr.controller('logInCtrl', function ($scope, login) {
    $scope.loggedIn = false;

    $scope.updateLoginState = function () {
        userLogin.updateLoginState().then( function () {
            $scope.loggedIn = String(userLogin.logInState());
        });

    };

    $scope.login = function () {
        userLogin.logIn($scope.username, $scope.password).then(
            function () {
                $scope.loggedIn = true;
            }, function (error) {
                $scope.loggedIn = false;
                $scope.failureReason = error;
            }
        );

    };

    $scope.logout = function () {
        userLogin.logOut().then(function () {
            $scope.loggedIn = false;
            $scope.user = undefined;
        });
    };

    $scope.getUser = function () {
        if ($scope.loggedIn) {
            $scope.user = userLogin.user()
        }
    };

    $scope.updateLoginState();
});