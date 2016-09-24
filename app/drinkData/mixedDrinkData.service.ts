import * as angular from 'angular';
import * as angularResource from 'angular-resource'

export class mixedDrinkService {
    static $inject = ['$resource']

    constructor(
        private $resource: ng.resource.IResourceService
    ){}

    addMixedDrink(drink){
        return this.$resource('/api/mixedDrink').save(drink);
    }

    getMixedDrinks() {
        return this.$resource('/api/mixedDrinks').query();
    }

    getMixedDrink(id) {
        return this.$resource('/api/mixedDrink/:id', {id}).get();
    }
}

angular.module('app').service('mixedDrinkData', mixedDrinkService);