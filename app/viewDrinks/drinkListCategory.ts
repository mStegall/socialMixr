import * as angular from 'angular';
import * as _ from 'lodash';

class drinkListCategoryCtrl {
  static $inject = ['drinkData'];

  constructor(
    private drinkData
  ) { }

  // Inputs
  category: string;


  filterCollapsed: boolean = true;
  types: string[];
  drinks: any[];

  $onInit() {
    let data = this.drinkData.getDrinksByCategory(this.category)
    data.$promise
      .then(() => {
        this.drinks = data.drinks
        this.category = data.category
      })
      .then(() => {
        var types = this.drinks.map(drink => drink.type);

        this.types = _.uniq(types);
      })
  }
}

angular.module('app').component('drinkListCategory', {
  templateUrl: '/viewDrinks/drinkListCategory.html',
  controller: drinkListCategoryCtrl,
  bindings: {
    category: '<'
  }
})