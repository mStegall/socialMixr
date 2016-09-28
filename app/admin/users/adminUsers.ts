import * as angular from 'angular';
import {AdminUsers} from './adminUsers.service';


class AdminUsersCtrl  {
    static $inject = ['adminUsers'];
    
    constructor(
        private adminUsers: AdminUsers
    ){}
    
    toggle = true;
    users = this.adminUsers.getUsers();
};

angular.module('app').component('adminUsers', {
    templateUrl: '/admin/users/adminUsers.html',
    controller: AdminUsersCtrl
});