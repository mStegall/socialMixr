angular.module('app').controller('signUpModalCtrl', function ($scope, login, $uibModalInstance, $resource) {
    "ngInclude";
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    
    $scope.submit = function () {
        var req = $resource('/signUp').save($scope.user);
        req.$promise.then($uibModalInstance.close("Signed Up"))
    };

    $scope.checkValid = function (comp) {
        return {
            'has-success': comp.$valid,
            'has-error': comp.$invalid
        };
    };
});