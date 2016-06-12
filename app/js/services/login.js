socialmixr.factory('login', function ($http, $q, userInfo) {
    var loginState = false;

    return {
        updateLoginState : function () {
            var deferred = $q.defer();

            $http.get('/loggedIn').then(function (response) {
                loginState = true;
                userInfo.setUser(response.data);
                deferred.resolve(response);
            },function (response) {
                loginState = false;
                deferred.reject(response);
            });

            return deferred.promise;
        },
        logIn : function (username, password) {
            var deferred = $q.defer();

            $http.post('/login', {username: username, password: password}).then(function (response) {
                loginState = true;
                user = response.data;
                deferred.resolve(response);
            },function (response) {
                loginState = false;
                deferred.reject(response.data.reason);
            });

            return deferred.promise;
        },
        logOut : function () {
            var deferred = $q.defer();

            $http.post('/logout').then(function (response) {
                loginState = false;
                user = {};
                deferred.resolve(response);
            });

            return deferred.promise;
        },
        logInState: function () {
            return loginState;
        }
    }
});