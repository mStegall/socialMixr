import * as angular from 'angular';
import { UserService } from './userInfo.service';

class UserProfileCtrl implements ng.IController {
    static $inject = ['userInfo'];

    constructor(
        private userInfo: UserService
    ) { }

    user: any;

    $onInit() {
        this.user = this.userInfo.getUser();
    }
}

angular.module('app').component('userProfile', {
    templateUrl: '/profile/userProfile.html',
    controller: UserProfileCtrl
});