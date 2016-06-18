angular.module('app').factory('userInfo', function () {
    var user = undefined;

    return {
        setUser: function (userInfo) {
            user = userInfo;
        },
        getUser: function () {
            return user;
        },
        setUserProperty: function (property, value) {
            user[property] = value;
        }
    }

});