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

  $onInit() {
    this.updateUser();

    // Listen for changes in login state
    this.login.logInSubscribe(this.$scope, this.updateUser.bind(this));
  }

  $onChanges(changes) {
    if (changes.categoryId) {
      this.drink = {
        categoryId: parseInt(this.categoryId)
      }
    }
  }

  closeAlert(index) {
    this.alerts.splice(index, 1);
  }

  // Get user state and set alerts
  updateUser() {
    this.user = this.userInfo.getUser();
    // debugger;
    if (!this.user) {
      this.alerts = [{ msg: "You won't be able to save while not logged in!" }]
    } else {
      this.alerts = []
    }
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