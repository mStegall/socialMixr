import * as angular from 'angular';
import 'angular-resource';

export class AdminMixedDrinksService {
    static $inject = ['$resource'];

    constructor(
        private $resource: ng.resource.IResourceService
    ){}

    getReviewDrinks() {
        return this.$resource('/api/admin/mixedDrinks/review').query();
    }
    getUnapprovedDrinks() {
        return this.$resource('/api/admin/mixedDrinks/unapproved').query();
    }
    approveDrink(id) {
        return this.$resource('/api/admin/mixedDrink/:id/approve', { id: id }).save();
    }
    rejectDrink(id) {
        return this.$resource('/api/admin/mixedDrink/:id/reject', { id: id }).save();
    }
    flagDrink(id) {
        return this.$resource('/api/admin/mixedDrink/:id/flag', { id: id }).save();
    }
}

angular.module('app').service('adminMixedDrinks', AdminMixedDrinksService);