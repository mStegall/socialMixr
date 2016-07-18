angular.module('app').component('drinkDetails', {
    templateUrl:'/viewDrinks/drinkDetails.html',
    controller: drinkDetailsCtrl,
    bindings: {
        id: '@'
    }
})

function drinkDetailsCtrl (drinkData, authService, adminData) {
    "ngInclude";
    var vm = this;

    vm.$onInit = function() {
        vm.drink = drinkData.getDrink(vm.id);    
        vm.admin = authService.hasRole('admin')
    }    

    vm.flagDrink = function () {
        var flag = adminData.flagDrink(vm.drink._id);
        flag.$promise.then(function(){
            alert('Drink flagged for review!');
        })
    }
}