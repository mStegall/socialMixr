import * as angular from 'angular'
import 'angular-resource'

export class drinkService {
    static $inject = ['$resource']

    constructor(
        private $resource: ng.resource.IResourceService
    ) { }

    getDrinks() {
        return this.$resource('/api/drinks').query();
    }

    getTypes() {
        return this.$resource('/api/drinkTypes').query();
    }

    getSubtypes() {
        return this.$resource('/api/drinkSubtypes').query();
    }

    getCategories() {
        return this.$resource('/api/drinkCategories').query();
    }

    getDrinksByCategory(category) {
        return this.$resource('/api/drinks/:category', { category: category }).get();
    }

    addDrink(drink) {
        return this.$resource('/api/drink').save(drink);
    }

    getDrink(id) {
        return this.$resource('/api/drink/:id', { id: id }).get();
    }

    deleteDrink(drinkId) {
        return this.$resource('/api/deleteDrink/').save({ id: drinkId });
    }

    updateDrink(drink) {
        return this.$resource('/api/updateDrink').save(drink);
    }
}

angular.module('app').service('drinkData', drinkService);
