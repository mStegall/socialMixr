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
            if (vm.ingredient.id){
                var data = {
                    type: "db",
                    drinkId: vm.ingredient.id,
                    amount: vm.amount
                }
            } else {
                var data = {
                    type: "user",
                    name: vm.ingredient,
                    amount: vm.amount
                }
            }

            vm.onUpdate({data:data})
        }
    }
}