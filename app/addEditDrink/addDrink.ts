import * as angular from 'angular'
import { drinkService } from '../drinkData'
import { userService } from '../profile'
import { loginService } from '../login'

class addComponentCtrl {
  static $inject = ['drinkData', 'userInfo', 'login', '$scope', '$window']

  constructor(
    private drinkData: drinkService,
    private userInfo: userService,
    private login: loginService,
    private $scope: ng.IScope,
    private $window: ng.IWindowService
  ) { }

  // Inputs
  categoryId: string;

  alerts: any[] = [];
  user: any;
  drink: any;

  $onChanges(changes) {
    if (changes.categoryId) {
      this.drink = {
        categoryId: parseInt(this.categoryId)
      }
    }
  }

  setUser(user){
    this.user = user;
  }

  saveDrink(drink) {
    this.drinkData.addDrink(drink);
    this.$window.history.back();
  }

  cancel() {
    this.$window.history.back();
  }
}

angular.module('app').component('addDrink', {
  templateUrl: '/addEditDrink/addDrink.html',
  controller: addComponentCtrl,
  bindings: {
    categoryId: '<'
  }
})