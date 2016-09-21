(function () {
  angular.module('app').component('editDrink', {
    templateUrl: '/addEditDrink/editDrink.html',
    controller: editDrinkCtrl,
    bindings: {
      drink: '<'
    }
  })

  function editDrinkCtrl(drinkData, $window) {
    "ngInclude";

    var vm = this;

    vm.saveDrink = function (drink) {
      console.log(drink);
      console.log(drink.type.id);

      
      //     drinkData.saveDrink(vm.drink);
      

      // $window.history.back();
    }

    vm.cancel = function () {
      $window.history.back();
    }
  }
})()
