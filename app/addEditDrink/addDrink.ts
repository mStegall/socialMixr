import * as angular from 'angular';
import { DrinkService } from '../drinkData';
import { UserService } from '../profile';
import { LoginService } from '../login';

class AddComponentCtrl {
  static $inject = ['drinkData', 'userInfo', 'login', '$scope', '$window'];

  constructor(
    private drinkData: DrinkService,
    private userInfo: UserService,
    private login: LoginService,
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
      };
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
  controller: AddComponentCtrl,
  bindings: {
    categoryId: '<'
  }
});