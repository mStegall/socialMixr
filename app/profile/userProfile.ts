import * as angular from 'angular';
import { userService } from './userInfo.service'

class userProfileCtrl implements ng.IController {
    static $inject = ['userInfo']

    constructor(
        private userInfo: userService
    ) { }

    user: any;

    $onInit() {
        this.user = this.userInfo.getUser();
    }
}

angular.module('app').component('userProfile', {
    templateUrl: '/profile/userProfile.html',
    controller: userProfileCtrl
})