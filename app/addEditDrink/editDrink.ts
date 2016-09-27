import * as angular from 'angular';
import { DrinkService } from '../drinkData';

class EditDrinkCtrl {
  static $inject = ['drinkData', '$window'];

  constructor(
    private drinkData: DrinkService,
    private $window: ng.IWindowService
  ) { }

  saveDrink (drink) {
    // console.log(drink);
    // console.log(drink.type.id);
    // drinkData.saveDrink(vm.drink);
    // $window.history.back();
  }

  cancel () {
    this.$window.history.back();
  }
}

angular.module('app').component('editDrink', {
  templateUrl: '/addEditDrink/editDrink.html',
  controller: EditDrinkCtrl,
  bindings: {
    drink: '<'
  }
});
