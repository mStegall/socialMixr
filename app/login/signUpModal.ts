import * as angular from "angular";
import 'angular-resource';
import 'angular-ui-bootstrap';
import { LoginService } from './login.service';

class SignUpModalCtrl implements ng.IController {
    "ngInclude";

    static $inject = ['login', '$uibModalInstance', '$resource'];

    constructor(
        private login: LoginService,
        private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
        private $resource: ng.resource.IResourceService
    ) { }

    alerts = [];
    user: any;

    closeAlert(index) {
        this.alerts.splice(index, 1);
    }

    submit() {
        var req = this.$resource('/signUp').save(this.user);
        req.$promise.then(function () { this.$uibModalInstance.close("Signed Up"); });
    }

    checkValid(comp) {
        return {
            'has-success': comp.$valid,
            'has-error': comp.$invalid
        };
    }
}

angular.module('app').controller('signUpModalCtrl', SignUpModalCtrl);