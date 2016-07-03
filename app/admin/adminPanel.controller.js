angular.module('app').controller('adminPanelCtrl', function ($scope, authService, $routeParams) {
    "ngInclude";
    
    if ($routeParams.page) {
        $scope.page = $routeParams.page;
    } else {
        $scope.page = "users";
    }
    
    authService.roleRouter('admin');

});