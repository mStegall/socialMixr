(function () {
  angular.module('app').component('addDrink', {
    templateUrl: '/addEditDrink/addDrink.html',
    controller: addComponentCtrl,
    bindings: {
      categoryId: '<'
    }
  })


  function addComponentCtrl(drinkData, userInfo, login, $scope) {
    "ngInclude";

    var vm = this;

    vm.$onInit = function () {
      vm.alerts = []
    
      updateUser();

      // Listen for changes in login state
      login.logInSubscribe($scope, updateUser);
    }

    vm.$onChanges = function (changes) {
      if (changes.categoryId) {
        vm.categoryId = parseInt(vm.categoryId)
      }
    }

    
    vm.closeAlert = function (index) {
      vm.alerts.splice(index, 1);
    }

    // Get user state and set alerts
    function updateUser() {
      vm.user = userInfo.getUser();
      // debugger;
      if (!vm.user) {
        vm.alerts = [{ msg: "You won't be able to save while not logged in!" }]
      } else {
        vm.alerts = []
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