(function () {
  angular.module('app').component('adminUnapprovedDrinks', {
    templateUrl: '/admin/simpleDrinks/adminUnapprovedDrinks.html',
    controller: adminUnapprovedDrinksCtrl
  });

  function adminUnapprovedDrinksCtrl(adminDrinks) {
    "ngInclude";

    var vm = this;

    vm.$onInit = function () {
      vm.columns = [
        {
          name: 'name',
          title: 'Name'
        },{
          name: 'type',
          title: 'Type'
        },{
          name: 'abv',
          title: 'ABV',
          hiddenXs:true
        },{
          unsortable: true
        }
      ];

      vm.sortOrder = 'name';
      vm.toggle = true;
      vm.drinks = adminDrinks.getUnapprovedDrinks();
    };

    vm.sortOrderSet = function (field) {
      if (vm.sortOrder === field) {
        vm.sortOrder = '-' + field;
      } else {
        vm.sortOrder = field;
      }
    };
  }
})();