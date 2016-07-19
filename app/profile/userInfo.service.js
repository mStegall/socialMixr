(function () {
    angular.module('app').factory('userInfo', function (authService) {
        "ngInclude";
        var user = undefined;

        return {
            setUser: function (userInfo) {
                user = userInfo;
                authService.setRoles(user.roles);
            },
            getUser: function () {
                return user;
            },
            setUserProperty: function (property, value) {
                user[property] = value;
            },
            clearUser: function () {
                user = undefined;
                authService.clearRoles();
            }
        }
    })
})()