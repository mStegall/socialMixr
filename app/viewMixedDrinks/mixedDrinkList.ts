import * as angular from 'angular';
import { mixedDrinkService } from '../drinkData'
import { column } from '../table/header'



angular.module('app').component('mixedDrinkList', {
    templateUrl: '/viewMixedDrinks/mixedDrinkList.html',
    controller: mixedDrinksCtrl
})

class mixedDrinksCtrl {
    static $inject = ['mixedDrinkData']

    constructor(
        private mixedDrinkData: mixedDrinkService
    ) { }

    columns: column[] = [{
        name: 'name',
        title: 'Name'
    }]

    drinks: any;

    sortOrder: string = "name";

    $onInit() {
        this.drinks = this.mixedDrinkData.getMixedDrinks();
    }


    setSortOrder(field) {
        if (this.sortOrder == field) {
            this.sortOrder = '-' + field;
        } else {
            this.sortOrder = field;
        }
    }

}
