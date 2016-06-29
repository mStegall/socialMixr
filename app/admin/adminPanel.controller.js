angular.module('app').controller('adminPanelCtrl', function ($scope, authService, $routeParams) {
    "ngInclude";

    var pages = {
        users: '/admin/adminUsers.html',
        simpleDrinks: '/admin/adminSimpleDrinks.html',
        mixedDrinks: '/admin/adminMixedDrinks.html'
    };
    
    if ($routeParams.page) {
        $scope.template = pages[$routeParams.page];
    } else {
        $scope.template = pages.users;
    }
    
    authService.roleRouter('admin');
    
    $scope.roles = authService.getRoles();
    
    $scope.isAdmin = authService.hasRole("admin");


});