(function () {
    angular.module('app').factory('userInfo', function (authService, $resource) {
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
            },
            mixedDrinks:mixedDrinks
        }

        function mixedDrinks() {
            return $resource('/data/profile/mixedDrinks').query();
        }
    })
})()