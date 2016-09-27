import * as angular from 'angular';
import * as uiBootstrap from 'angular-ui-bootstrap'
import { loginService } from './login.service'

class logInModalCtrl implements ng.IController {
    "ngInclude";

    static $inject = ["login", "$uibModal", "$uibModalInstance"]

    constructor(
        private loginService: loginService,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance
    ) { }

    alerts = [];

    username: string;
    password: string;

    closeAlert(index) {
        this.alerts.splice(index, 1);
    };

    login() {
        this.loginService.logIn(this.username, this.password)
            .then(() => {
                this.$uibModalInstance.close("logged In")
            })
            .catch((response) => {
                this.alerts = [{ msg: response }]
            })
    };

    signUp() {
        this.$uibModal.open({
            templateUrl: '/login/signUpModal.html',
            controller: 'signUpModalCtrl',
            controllerAs: '$ctrl'
        })
    }
}

angular.module('app').controller('logInModalCtrl', logInModalCtrl)
