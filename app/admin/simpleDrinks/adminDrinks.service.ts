import * as angular from 'angular';
import 'angular-resource';

export class AdminDrinksService {
    static $inject = ['$rsource'];

    constructor(
        private $resource: ng.resource.IResourceService
    ) { }

    getReviewDrinks () {
        return this.$resource('/api/admin/drinks/review').query();
    }

    getUnapprovedDrinks () {
        return this.$resource('/api/admin/drinks/unapproved').query();
    }

    approveDrink (id) {
        return this.$resource('/api/admin/drink/:id/approve', { id: id }).save();
    }

    rejectDrink (id) {
        return this.$resource('/api/admin/drink/:id/reject', { id: id }).save();
    }

    flagDrink (id) {
        return this.$resource('/api/admin/drink/:id/flag', { id: id }).save();
    }
}

angular.module('app').service('adminDrinks', AdminDrinksService);