import * as angular from 'angular';
import { userService } from './userInfo.service'

class userMixedDrinksCtrl implements ng.IController {
    static $inject = ['userInfo']

    constructor (
        private userInfo : userService
    ){}

    columns = [
        {
            name: 'name',
            title: 'Name'
        }
    ];

    drinks: any[];
    sortOrder: string;

    $onInit () {
        this.drinks = this.userInfo.mixedDrinks();

        this.sortOrder = 'name'
    }

    setSortOrder (field) {
        if (this.sortOrder == field) {
            this.sortOrder = '-' + field;
        } else {
            this.sortOrder = field;
        }
    }
}

angular.module('app').component('userMixedDrinks', {
    templateUrl: '/profile/userMixedDrinks.html',
    controller: userMixedDrinksCtrl
})