import * as angular from "angular";
import {loginService} from './login.service'

(function () {
    class navbarLoginCtrl implements angular.IComponentController {
        static $inject = ["$scope", "login", "$uibModal", "userInfo", "$location", "authService"];

        constructor(
            private $scope: ng.IScope,
            private login: loginService,
            private $uibModal,
            private userInfo,
            private $location: ng.ILocationService,
            private authService) {
        }

        loggedIn: boolean;
        user: any;
        isAdmin: boolean;

        $onInit() {
            this.login.updateLoginState();
            this.login.logInSubscribe(this.$scope, this.loginUpdate)
        }

        private loginUpdate = () => {
            this.loggedIn = this.login.logInState();
            this.user = this.userInfo.getUser();
            this.isAdmin = this.authService.hasRole('admin');
        }

        logInModal() {
            this.login.logInModal();
        }

        logOut() {
            this.login.logOut().then(() => {
                this.$location.url('/')
            });
        };
    }

    angular.module('app').component('navbarLogin', {
        templateUrl: 'login/navbarLogin.html',
        controller: navbarLoginCtrl
    })
})()