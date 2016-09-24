import * as angular from 'angular';
import {authService} from '../auth'
import {drinkService} from '../drinkData'

class drinkDetailsCtrl {
    static $inject = ['drinkData', 'authService', 'adminDrinks']

    constructor(
        private drinkData: drinkService,
        private authService: authService,
        private adminDrinks
    ){}

    // Inputs
    id: number;

    drink: any;
    admin: boolean;

    $onInit() {
        this.drink = this.drinkData.getDrink(this.id);
        this.admin = this.authService.hasRole('admin')
    }

    flagDrink () {
        var flag = this.adminDrinks.flagDrink(this.drink.id);

        flag.$promise.then(function () {
            alert('Drink flagged for review!');
        })
    }
}

angular.module('app').component('drinkDetails', {
    templateUrl: '/viewDrinks/drinkDetails.html',
    controller: drinkDetailsCtrl,
    bindings: {
        id: '<'
    }
})