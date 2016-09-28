import * as angular from 'angular';
import 'angular-resource';

export class AdminUsers {
    static $inject = ['$resource'];
    
    constructor(
        private $resource: ng.resource.IResourceService
    ){}

    getUsers() {
        return this.$resource('/api/admin/users').query();
    }
}

angular.module('app').service('adminUsers', AdminUsers);