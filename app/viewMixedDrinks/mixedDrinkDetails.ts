import * as angular from 'angular'
import {mixedDrinkService} from '../drinkData'

class mixedDrinksCtrl implements ng.IController{
    static $inject = ['mixedDrinkData']

    constructor(
        private mixedDrinkData: mixedDrinkService
    ){}

    id: number;
    drink: any;

    $onInit() {
        this.drink = this.mixedDrinkData.getMixedDrink(this.id);
    }
}

angular.module('app').component('mixedDrinkDetails', {
    templateUrl: '/viewMixedDrinks/mixedDrinkDetails.html',
    controller: mixedDrinksCtrl,
    bindings: {
        id: '<'
    }
})