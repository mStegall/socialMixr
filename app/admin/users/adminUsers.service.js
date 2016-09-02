(function () {
    angular.module('app').factory('adminUsers', function ($resource) {
        "ngInclude";
        return {
            getUsers: getUsers
        }

        function getUsers() {
            return $resource('/api/admin/users').query()
        }
    })
})()