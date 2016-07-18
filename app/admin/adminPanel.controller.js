angular.module('app').controller('adminPanelCtrl', function ($scope, authService, $routeParams) {
    "ngInclude";
    
    authService.roleRouter('admin');

    $scope.list = [
        {
            name: 'users',
            title: 'Users'
        },
        {
            name: 'simpleDrinks',
            title: 'Approve Simple Drinks'
        },
        {
            name: 'unapprovedDrinks',
            title: 'Unapproved Drinks'
        },
        {
            name: 'mixedDrinks',
            title: 'Mixed Drinks'
        }
    ]
    
    if ($routeParams.page) {
        $scope.page = $routeParams.page;
    } else {
        $scope.page = 'users';
    }

    $scope.pageTitle = $scope.list.filter(function (item) {
        return item.name == $scope.page;
    })[0].title
});