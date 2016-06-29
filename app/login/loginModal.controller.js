angular.module('app').controller('loginModalCtrl', function ($scope, login, $uibModalInstance, $uibModal) {
    "ngInclude";
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    
    $scope.login = function () {
        login.logIn($scope.username, $scope.password).then(
            function () {
                $uibModalInstance.close("Logged In")
            },
            function (response) {
                $scope.alerts = [{msg: response}]
            }
        );
    };

    $scope.signUp = function () {
      var modal = $uibModal.open({
          templateUrl: "login/signUpModal.html",
          controller: "signUpModalCtrl"
      })
    }
});