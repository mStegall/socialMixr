import * as angular from 'angular';
import 'angular-ui-bootstrap';

import { LoginService } from './login.service';

class LogInModalCtrl implements ng.IController {
    static $inject = ["login", "$uibModal", "$uibModalInstance"];

    constructor(
        private LoginService: LoginService,
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
        this.LoginService.logIn(this.username, this.password)
            .then(() => {
                this.$uibModalInstance.close("logged In");
            })
            .catch((response) => {
                this.alerts = [{ msg: response }];
            });
    };

    signUp() {
        this.$uibModal.open({
            templateUrl: '/login/signUpModal.html',
            controller: 'signUpModalCtrl',
            controllerAs: '$ctrl'
        });
    }
}

angular.module('app').controller('logInModalCtrl', LogInModalCtrl);
