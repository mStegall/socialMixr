(function () {
    angular.module('app').factory('adminUsers', function ($resource) {
        "ngInclude";
        return {
            getUsers: getUsers
        }

        function getUsers() {
            return $resource('/data/users').query()
        }
    })
})()