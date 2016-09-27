import * as angular from 'angular';
import { DrinkService, MixedDrinkService } from '../drinkData';
import { UserService } from '../profile';
import { LoginService } from '../login';

class AddEditMixedDrinkCtrl {
  static $inject = ['drinkData', 'userInfo', 'login', '$scope', 'mixedDrinkData'];

  constructor(
    private drinkData: DrinkService,
    private userInfo: UserService,
    private login: LoginService,
    private $scope: ng.IScope,
    private mixedDrinkData: MixedDrinkService
  ) { }

  // Initialize with two ingredients 
  ingredients: any[] = [{}, {}];

  title = "Create a Mixed Drink";
  drinks: any[];
  user: any;

  // Form vars
  name: string;
  description: string;
  instructions: string;
  public: boolean;


  $onInit() {
    // Load all drinks
    this.drinks = this.drinkData.getDrinks();
  }

  setUser(user) {
    this.user = user;
  }

  // Process form data into final drink data
  // TODO: Actually submit to server
  submit() {
    var drink = {
      name: this.name,
      creator: this.user.id,
      description: this.description,
      instructions: this.instructions,
      drinkIngredients: [],
      customIngredients: [],
      review: this.public
    };

    // Iterate through raw ingredient array and sort into appropriate arrays
    this.ingredients.forEach(function (ingredient) {
      if (ingredient.drinkId) {
        drink.drinkIngredients.push(ingredient);
      } else {
        drink.customIngredients.push(ingredient);
      }
    });

    this.mixedDrinkData.addMixedDrink(drink).$promise
      .then(function () {
        alert('success');
      });
  }

  // Update ingredient model from component data
  updateIngredient(ingredient, data) {
    if (data.drinkId) {
      ingredient.drinkId = data.drinkId;
      delete ingredient.name;
    } else {
      ingredient.name = data.name;
      delete ingredient.drinkId;
    }

    ingredient.amount = data.amount;
  }

  // Add ingredient input by adding new object to ingredients array
  addIngredient() {
    this.ingredients.push({});
  }
}

angular.module('app').component('addMixedDrink', {
  templateUrl: '/addEditMixedDrink/addMixedDrink.html',
  controller: AddEditMixedDrinkCtrl
});