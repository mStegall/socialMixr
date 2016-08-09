(function(){
angular.module('app').factory('login', function ($http, $q, userInfo, $rootScope, $uibModal) {
    "ngInclude";

    var loggedIn = false;

    return {
        updateLoginState: updateLoginState,
        logIn: logIn,
        logOut: logOut,
        logInModal: logInModal,
        logInSubscribe: logInSubscribe,
        logInState: function () {
            return loggedIn;
        }
    }

    function logInModal () {
        return $uibModal.open({
            templateUrl: '/login/logInModal.html',
            controller: 'logInModalCtrl',
            controllerAs: '$ctrl'
        });
    }

    function logInSubscribe(scope, cb) {
        scope.$on('Log In State Changed', cb)
        
    }

    function updateLoginState() {
        var deferred = $q.defer();

        $http.get('/loggedIn').then(function (response) {
            loggedIn = true;
            userInfo.setUser(response.data);
            $rootScope.$broadcast('Log In State Changed');
            deferred.resolve(response);
        }, function (response) {
            loggedIn = false;
            $rootScope.$broadcast('Log In State Changed');
            deferred.reject(response);
        });

        return deferred.promise;
    }

    function logIn(username, password) {
        var deferred = $q.defer();

        $http.post('/login', { username: username, password: password }).then(function (response) {
            loggedIn = true;
            userInfo.setUser(response.data);
            $rootScope.$broadcast('Log In State Changed');
            deferred.resolve(response);
        }, function (response) {
            loggedIn = false;
            deferred.reject(response.data.reason);
        });

        return deferred.promise;
    }

    function logOut() {
        var deferred = $q.defer();

        $http.post('/logout').then(function (response) {
            loggedIn = false;
            userInfo.clearUser();
            $rootScope.$broadcast('Log In State Changed');
            deferred.resolve(response);
        });

        return deferred.promise;
    }
})
})()