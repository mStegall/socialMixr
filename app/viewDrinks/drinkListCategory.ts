import * as angular from 'angular';
import * as _ from 'lodash';
import { DrinkService } from '../drinkData';

class DrinkListCategoryCtrl {
  static $inject = ['drinkData'];

  constructor(
    private drinkData: DrinkService
  ) { }

  // Inputs
  category: string;


  filterCollapsed: boolean = true;
  types: string[];
  drinks: any[];

  $onInit() {
    this.drinkData.getDrinksByCategory(this.category)
      .subscribe((data) => {
        this.drinks = data.drinks;
        this.category = data.category;

        var types = this.drinks.map(drink => drink.type);
        this.types = _.uniq(types);
      });
  }
}

angular.module('app').component('drinkListCategory', {
  templateUrl: '/viewDrinks/drinkListCategory.html',
  controller: DrinkListCategoryCtrl,
  bindings: {
    category: '<'
  }
});