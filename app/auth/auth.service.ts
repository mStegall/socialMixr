import * as angular from 'angular'

export class authService {
    static $inject = ['$location']

    constructor(
        private $location: ng.ILocationService
    ) { }

    roles: string[] = [];

    setRoles(userRoles: string[]) {
        this.roles = userRoles;
    }

    getRoles() {
        return this.roles;
    }

    clearRoles() {
        this.roles = [];
    }

    hasRole(role: string) {
        return this.roles.indexOf(role) !== -1;
    }

    roleRouter(role: string) {
        if(this.hasRole(role)){
            return true;
        }
        this.$location.path('/');
        return true;
    }

} 

angular.module('app').service('authService', authService);