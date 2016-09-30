import * as angular from 'angular';
import { MixedDrinkService } from '../drinkData';

class MixedDrinksCtrl implements ng.IController {
  static $inject = ['mixedDrinkData'];

  constructor(
    private mixedDrinkData: MixedDrinkService
  ) { }

  id: number;
  drink: any;

  $onInit() {
    this.mixedDrinkData.getMixedDrink(this.id)
      .subscribe(data => {
        this.drink = data;
      });
  }
}

angular.module('app').component('mixedDrinkDetails', {
  templateUrl: '/viewMixedDrinks/mixedDrinkDetails.html',
  controller: MixedDrinksCtrl,
  bindings: {
    id: '<'
  }
});