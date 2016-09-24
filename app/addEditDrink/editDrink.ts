import * as angular from 'angular'
import { drinkService } from '../drinkData'

class editDrinkCtrl {
  static $inject = ['drinkData', '$window']

  constructor(
    private drinkData: drinkService,
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
  controller: editDrinkCtrl,
  bindings: {
    drink: '<'
  }
})
