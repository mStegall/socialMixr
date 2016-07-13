angular.module('app').factory('authService', function ($location) {
    "ngInclude";

    var roles = undefined;

    return {
        setRoles: function (userRoles) {
            roles = userRoles;
        },
        hasRole: function (role) {
            return roles !== undefined && roles.indexOf(role) !== -1;

        },
        getRoles: function () {
            return roles;
        },
        roleRouter: function (role) {
            if (roles === undefined || roles.indexOf(role) === -1) {
                $location.path('/');
                return false;
            }
            return true;
        }
    };
});