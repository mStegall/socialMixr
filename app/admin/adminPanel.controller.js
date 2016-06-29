angular.module('app').controller('adminPanelCtrl', function ($scope, authService) {
    "ngInclude";

    authService.roleRouter('admin');
    
    $scope.roles = authService.getRoles();
    
    $scope.isAdmin = authService.hasRole("admin");
});