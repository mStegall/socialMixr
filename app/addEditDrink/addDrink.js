(function () {
  angular.module('app').component('addDrink', {
    templateUrl: '/addEditDrink/addDrink.html',
    controller: addComponentCtrl,
    bindings: {
      category: '<'
    }
  })


  function addComponentCtrl(drinkData, $log, $window, $routeParams) {
    "ngInclude";

    var vm = this;

    vm.$onInit = function () {
      vm.drink = { category: vm.category };
      vm.abvMode = "200";
    }


    vm.saveDrink = function (drink) {
      console.log(drink);
      console.log(drink.type.id);

      // drinkData.addDrink(vm.drink);
      // $window.history.back();
    }

    vm.cancel = function () {
      $window.history.back();
    }
  }
})();