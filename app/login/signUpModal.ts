import * as angular from "angular";
import * as angularResource from 'angular-resource';
import * as uiBootstrap from 'angular-ui-bootstrap'
import {loginService} from './login.service';

class signUpModalCtrl implements ng.IController {
    "ngInclude";

    static $inject = ['login', '$uibModalInstance', '$resource']

    constructor(
        private login: loginService,
        private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
        private $resource: ng.resource.IResourceService
    ){}

    alerts = [];
    user: any;

    closeAlert (index) {
        this.alerts.splice(index, 1)
    }

    submit () {
        var req = this.$resource('/signUp').save(this.user)
        req.$promise.then(function(){this.$uibModalInstance.close("Signed Up")})
    }

    checkValid (comp) {
        return {
            'has-success': comp.$valid,
            'has-error': comp.$invalid
        }
    }
}

angular.module('app').controller('signUpModalCtrl', signUpModalCtrl)