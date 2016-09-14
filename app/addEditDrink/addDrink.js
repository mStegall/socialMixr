(function () {
  angular.module('app').component('addDrink', {
    templateUrl: '/addEditDrink/addDrink.html',
    controller: addComponentCtrl,
    bindings: {
      categoryId: '<'
    }
  })


  function addComponentCtrl(drinkData, $log, $window, $routeParams) {
    "ngInclude";

    var vm = this;

    vm.$onChanges = function (changes){
      if(changes.categoryId){
        vm.categoryId = parseInt(vm.categoryId)
      }
    }

    vm.saveDrink = function (drink) {
      drinkData.addDrink(drink);
      $window.history.back();
    }

    vm.cancel = function () {
      $window.history.back();
    }
  }
})();