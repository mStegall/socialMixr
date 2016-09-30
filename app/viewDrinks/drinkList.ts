import * as angular from 'angular';
import * as _ from 'lodash';

import { DrinkService } from '../drinkData';

class DrinkListCtrl {
  static $inject = ['drinkData'];

  constructor(
    private drinkService: DrinkService
  ) { }

  filterCollapsed: boolean = true;
  drinks: any[];
  types: any[];

  $onInit() {
    this.drinkService.getDrinks()
      .subscribe(data => {
        this.drinks = data;

        var types = this.drinks.map(drink => drink.type);
        this.types = _.uniq(types);
      });
  }
}

angular.module('app').component('drinkList', {
  templateUrl: '/viewDrinks/drinkList.html',
  controller: DrinkListCtrl
});