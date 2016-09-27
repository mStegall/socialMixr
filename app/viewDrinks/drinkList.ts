import * as angular from 'angular';
import * as _ from 'lodash';

class DrinkListCtrl {
  static $inject = ['drinkData'];

  constructor(
    private drinkData
  ) { }

  filterCollapsed: boolean = true;
  drinks: any[];
  types: any[];

  $onInit() {
    this.drinks = this.drinkData.getDrinks();

    this.drinks.$promise
      .then(() => {
        var types = this.drinks.map(drink => drink.type);
        this.types = _.uniq(types);
      });
  }
}

angular.module('app').component('drinkList', {
  templateUrl: '/viewDrinks/drinkList.html',
  controller: DrinkListCtrl
});