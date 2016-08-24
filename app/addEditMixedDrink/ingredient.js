angular.module('app').component('ingredient', {
    templateUrl: '/addEditMixedDrink/ingredient.html',
    controller: ingredientCtrl,
    bindings: {
        drinks: '<',
        onUpdate: '&'
    }
})

function ingredientCtrl() {
    var vm = this;

    vm.update = function () {
        if (vm.ingredient) {
            if (vm.ingredient._id){
                var data = {
                    type: "db",
                    drink: vm.ingredient._id,
                    amount: vm.amount 
                }
            } else {
                var data = {
                    type: "user",
                    drink: vm.ingredient,
                    amount: vm.amount
                }
            }
            vm.onUpdate(data)
        }
    }
}