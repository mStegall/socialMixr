import * as angular from 'angular'
import { loginService } from './login.service'
import { userService } from '../profile'

class logInReqAlerts {
    static $inject = ['login', '$scope', 'userInfo']

    constructor(
        private login: loginService,
        private $scope: ng.IScope,
        private userInfo: userService
    ) { }

    // Inputs
    userChange: any;

    alerts = []

    $onInit() {
        console.log('hello')
        this.updateUser();
        this.login.logInSubscribe(this.$scope, this.updateUser.bind(this));
    }

    closeAlert(index) {
        this.alerts.splice(index, 1);
    }

    updateUser() {
        var user = this.userInfo.getUser();
        // debugger;
        if (!user) {
            this.alerts = [{ msg: "You won't be able to save while not logged in!" }]
        } else {
            this.alerts = []
        }

        this.userChange({user});
    }
}

angular.module('app').component('logInReqAlerts', {
    templateUrl: '/login/loginReqAlerts.html',
    controller: logInReqAlerts,
    bindings: {
        userChange: '&'
    }
})