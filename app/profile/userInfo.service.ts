import * as angular from 'angular'

import { authService } from '../auth/auth.service'

export class userService {
    static $inject = ['authService', '$resource']

    constructor(
        private authService: authService,
        private $resource: ng.resource.IResourceService
    ) { }

    _user: any;

    set user(user: any) {
        this._user = user;
        this.authService.setRoles(user.roles);
    }

    get user() {
        return this._user
    }

    setUser(user: any) {
        this.user = user
    }

    getUser() {
        return this.user
    }

    setUserProperty(property, value) {
        this._user[property] = value
    }

    clearUser() {
        this.user = {}
    }

    mixedDrinks() {
        return this.$resource('/data/profile/mixedDrinks').query();
    }
}

angular.module('app').service('userInfo', userService);