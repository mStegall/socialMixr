import * as angular from 'angular';
import { AuthService } from '../auth';
import { DrinkService } from '../drinkData';
import { AdminDrinksService } from '../admin';


class DrinkDetailsCtrl {
    static $inject = ['drinkData', 'authService', 'adminDrinks'];

    constructor(
        private drinkData: DrinkService,
        private AuthService: AuthService,
        private adminDrinks: AdminDrinksService
    ) { }

    // Inputs
    id: number;

    drink: any;
    admin: boolean;

    $onInit() {
        this.drink = this.drinkData.getDrink(this.id);
        this.admin = this.AuthService.hasRole('admin');
    }

    flagDrink() {
        var flag = this.adminDrinks.flagDrink(this.drink.id);

        flag.$promise.then(function () {
            alert('Drink flagged for review!');
        });
    }
}

angular.module('app').component('drinkDetails', {
    templateUrl: '/viewDrinks/drinkDetails.html',
    controller: DrinkDetailsCtrl,
    bindings: {
        id: '<'
    }
});