angular.module('app').component('navbarLogin',  {
    templateUrl: 'login/navbarLogin.html',
    controller: navbarLoginCtrl
})


function navbarLoginCtrl($scope, login, $uibModal, userInfo, $location, authService) {
    "ngInclude";

    var vm = this;

    vm.$onInit = function(){
        login.updateLoginState()
    }

    login.logInSubscribe($scope, function () {
        vm.loggedIn = login.logInState();
        vm.user = userInfo.getUser();
        vm.isAdmin = authService.hasRole('admin');
    })

    vm.logInModal = function () {
       login.logInModal();
    };

    vm.logOut = function () {
        login.logOut().then(function () {
            $location.url('/')
        });
    };
};