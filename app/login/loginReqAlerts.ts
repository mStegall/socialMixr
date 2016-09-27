import * as angular from 'angular';
import { LoginService } from './login.service';
import { UserService } from '../profile';

class LogInReqAlerts {
    static $inject = ['login', '$scope', 'userInfo'];

    constructor(
        private login: LoginService,
        private $scope: ng.IScope,
        private userInfo: UserService
    ) { }

    // Inputs
    userChange: any;

    alerts = [];

    $onInit() {
        console.log('hello');
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
            this.alerts = [{ msg: "You won't be able to save while not logged in!" }];
        } else {
            this.alerts = [];
        }

        this.userChange({user});
    }
}

angular.module('app').component('logInReqAlerts', {
    templateUrl: '/login/loginReqAlerts.html',
    controller: LogInReqAlerts,
    bindings: {
        userChange: '&'
    }
});