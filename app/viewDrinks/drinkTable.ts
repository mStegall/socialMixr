import * as angular from 'angular';
import {column} from '../table/header'

class drinkTableCtrl {
    columns: column[] = [
        {
            name: 'name',
            title: 'Name'
        }, {
            name: 'type',
            title: 'Type'
        }, {
            name: 'subtype',
            title: 'Subtype'
        }, {
            name: 'abv',
            title: 'ABV'
        }
    ]

    sortOrder: string = 'name';

    sortOrderSet (field: string) {
        if (this.sortOrder == field) {
            this.sortOrder = '-' + field;
        } else {
            this.sortOrder = field;
        }
    }

}

angular.module('app').component('drinkTable', {
    templateUrl: '/viewDrinks/drinkTable.html',
    controller: drinkTableCtrl,
    bindings: {
        drinks: '<',
        filter: '<'
    }
})