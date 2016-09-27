import * as angular from 'angular';
import { MixedDrinkService } from '../drinkData';
import { Column } from '../table/header';

class MixedDrinksCtrl {
  static $inject = ['mixedDrinkData'];

  constructor(
    private mixedDrinkData: MixedDrinkService
  ) { }

  columns: Column[] = [{
    name: 'name',
    title: 'Name'
  }];

  drinks: any;

  sortOrder: string = "name";

  $onInit() {
    console.log('test');
    this.drinks = this.mixedDrinkData.getMixedDrinks();
  }


  setSortOrder(field) {
    if (this.sortOrder === field) {
      this.sortOrder = '-' + field;
    } else {
      this.sortOrder = field;
    }
  }
}

angular.module('app').component('mixedDrinkList', {
  templateUrl: '/viewMixedDrinks/mixedDrinkList.html',
  controller: MixedDrinksCtrl
});