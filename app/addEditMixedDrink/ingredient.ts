import * as angular from 'angular';

class IngredientCtrl {
  // Inputs
  drinks: any;

  // Outputs
  onUpdate: any;

  // Declarations
  ingredient: any;
  amount: number;

  update() {
    if (this.ingredient) {
      var data: any;

      if (this.ingredient.id) {
        data = {
          type: "db",
          drinkId: this.ingredient.id,
          amount: this.amount
        };
      } else {
        data = {
          type: "user",
          name: this.ingredient,
          amount: this.amount
        };
      }

      this.onUpdate({ data });
    }
  }
}

angular.module('app').component('ingredient', {
  templateUrl: '/addEditMixedDrink/ingredient.html',
  controller: IngredientCtrl,
  bindings: {
    drinks: '<',
    onUpdate: '&'
  }
});