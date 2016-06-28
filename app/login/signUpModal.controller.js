angular.module('app').controller('signUpModalCtrl', function ($scope, login, $uibModalInstance) {
    "ngInclude";
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    
    $scope.submit = function () {
        
    }

    $scope.checkValid = function (comp) {
        return {
            'has-success': comp.$valid,
            'has-error': comp.$invalid
        };
    };
    
});